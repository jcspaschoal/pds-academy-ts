import {EntityValidationError, LoadEntityError, NotFoundError, UniqueEntityId} from "#seedwork/domain";
import {
    Document,
    Inscription,
    InscriptionRepository as InscriptionRepositoryContract,
    InscriptionStatus as InscriptionDomainStatus,
    InvalidInscriptionStatus,
    Status
} from "#inscription/domain";
import {Inscription as InscriptionPrismaModel, InscriptionStatus, PrismaClient} from "@prisma/client";
import {InscriptionUpdateDto, InscriptionUpdateOutputDto} from "#inscription/application";


function convertDomainStatusToPrismaEnum(domainStatus: InscriptionDomainStatus): InscriptionStatus {
    switch (domainStatus.value) {
        case Status.Approved:
            return InscriptionStatus.Approved
        case Status.Denied:
            return InscriptionStatus.Denied
        case Status.Pendent:
            return InscriptionStatus.Pendent
        default:
            throw new InvalidInscriptionStatus("Invalid Status")
    }
}

function convertPrismaEnumToDomainStatus(prismaStatus: InscriptionStatus): InscriptionDomainStatus {
    switch (prismaStatus) {
        case "Approved":
            return new InscriptionDomainStatus(Status.Approved)
        case "Denied":
            return new InscriptionDomainStatus(Status.Denied)
        case "Pendent":
            return new InscriptionDomainStatus(Status.Pendent)
        default:
            throw new Error("Invalid Status")
    }
}


export namespace InscriptionPrisma {
    export class InscriptionPrismaRepository implements InscriptionRepositoryContract.Repository {
        sortableFields: string[] = ['created_at'];

        constructor(private prisma: PrismaClient) {
        }

        bulkInsert(entities: Inscription[]): Promise<void> {
            return Promise.resolve(undefined);
        }

        delete(id: string | UniqueEntityId): Promise<void> {
            return Promise.resolve(undefined);
        }

        findAll(): Promise<Inscription[]> {
            return Promise.resolve([]);
        }

        async findById(id: string | UniqueEntityId): Promise<Inscription> {
            const idValue = id instanceof UniqueEntityId ? id.id : id;
            const inscription = await this.prisma.inscription.findUnique({
                where: {
                    user_id: idValue
                }
            })
            if (!inscription) {
                throw new NotFoundError('Failed to find inscription');
            }
            return InscriptionModelMapper.toEntity(inscription)
        }

        async insert(entity: Inscription): Promise<void> {
            return Promise.resolve(undefined);

        }

        async findInscriptionByInscriptionId(id: string | UniqueEntityId): Promise<Inscription> {
            const idValue = id instanceof UniqueEntityId ? id.id : id;
            const inscription = await this.prisma.inscription.findUnique({
                where: {
                    id_inscription: idValue
                }
            })
            if (!inscription) {
                throw new NotFoundError('Failed to find inscription');
            }
            return InscriptionModelMapper.toEntity(inscription)

        }

        async upsert(entity: Inscription): Promise<string> {
            const inscription = await this.prisma.inscription.upsert({
                where: {
                    user_id: entity.userId.toString()
                }, create: {
                    id_inscription: entity.id,
                    user_id: entity.userId.toString(),
                    document_path: entity.document.value.pathToDocument,
                    status: InscriptionStatus.Pendent,
                }, update: {
                    document_path: entity.document.value.pathToDocument, status: InscriptionStatus.Pendent,
                }, select: {
                    id_inscription: true
                }
            });
            return inscription.id_inscription.toString()
        }

        async search(props: InscriptionRepositoryContract.SearchParams): Promise<InscriptionRepositoryContract.SearchResult> {
            const offset = (props.page - 1) * props.per_page
            const limit = props.per_page
            const sort_dir = props.sort_dir ?? "desc"
            const paginatedInscriptions = await this.prisma.inscription.findMany(
                {
                    where: {
                        status: InscriptionStatus.Pendent
                    },
                    skip: offset,
                    take: limit,
                    orderBy: [
                        {
                            created_at: sort_dir
                        }
                    ]
                }
            )

            return new InscriptionRepositoryContract.SearchResult({
                items: paginatedInscriptions.map((m) => InscriptionModelMapper.toEntity(m)),
                current_page: props.page,
                per_page: props.per_page,
                total: await this.prisma.inscription.count(),
                filter: props.filter,
                sort: props.sort,
                sort_dir: sort_dir,
            });
        }

        async update(entity: Inscription): Promise<void> {
            const inscriptionStatus = convertDomainStatusToPrismaEnum(entity.status);
            await this.prisma.inscription.update({
                where: {
                    user_id: entity.userId.toString()
                }, data: {
                    document_path: entity.document.value.pathToDocument, status: inscriptionStatus,
                },
            });
        }

        async updateFilePath(id: UniqueEntityId | string, path: string) {
            await this.prisma.inscription.update({
                where: {
                    user_id: id.toString()
                }, data: {
                    document_path: path, status: InscriptionStatus.Pendent
                },
            });
        }

        async bulkStatusUpdate(adminId: string | UniqueEntityId, inscriptions: InscriptionUpdateDto[]): Promise<InscriptionUpdateOutputDto> {
            let successful = 0
            const errors = []
            const idValue = adminId instanceof UniqueEntityId ? adminId.id : adminId;
            for (const inscription of inscriptions) {
                try {
                    const dbStatus = inscription.status ? InscriptionStatus.Approved : InscriptionStatus.Denied;
                    const modelInscription = await this.prisma.inscription.findFirstOrThrow(
                        {
                            where: {
                                id_inscription: inscription.id
                            }
                        }
                    )

                    const result = await this.prisma.$transaction(
                        [
                            this.prisma.inscription.update(
                                {
                                    where: {
                                        id_inscription: inscription.id
                                    }, data: {
                                        status: dbStatus
                                    }
                                }
                            ),
                            this.prisma.inscriptionHasAdmin.create(
                                {
                                    data: {
                                        user_id: idValue,
                                        inscription_id: inscription.id
                                    }
                                }
                            ),
                            this.prisma.user.update({
                                where: {id_user: modelInscription.user_id},
                                data: {group_id: 3}
                            })
                        ]
                    )

                    successful += 1

                } catch (e) {
                    errors.push({
                        message: `Failed to update inscription : ${inscription.id.toString()}`
                    })
                }
            }
            return {successful: successful, errors: errors}
        }
    }


    export class InscriptionModelMapper {
        static toEntity(model: InscriptionPrismaModel) {
            try {
                const {id_inscription, ...otherData} = model;
                const domainStatus = convertPrismaEnumToDomainStatus(otherData.status)
                return new Inscription({
                    userId: otherData.user_id,
                    status: domainStatus,
                    document: new Document({pathToDocument: otherData.document_path})
                }, new UniqueEntityId(id_inscription))
            } catch (e) {
                if (e instanceof EntityValidationError) {
                    throw new LoadEntityError(e.error);
                }
                throw e;
            }
        }
    }
}