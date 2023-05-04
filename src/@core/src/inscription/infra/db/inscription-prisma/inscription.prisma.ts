import {EntityValidationError, LoadEntityError, NotFoundError, UniqueEntityId} from "#seedwork/domain";
import {
    Inscription,
    InscriptionRepository as InscriptionRepositoryContract,
    InscriptionStatus as InscriptionDomainStatus,
    Status,
    Document
} from "#inscription/domain";
import {Inscription as InscriptionPrismaModel, InscriptionStatus, PrismaClient} from "@prisma/client";
import {EmailAlreadyInUseError} from "#user/domain";


export namespace InscriptionPrisma {
    export class InscriptionPrismaRepository implements InscriptionRepositoryContract.Repository {
        sortableFields: string[] = ['created_at', 'status'];

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

            await this.prisma.inscription.create({
                data: {
                    id_inscription: entity.id,
                    user_id: entity.userId.toString(),
                    document_path: entity.document.value.pathToDocument,
                    status: InscriptionStatus.Pendent,
                },

            });
        }

        search(props: InscriptionRepositoryContract.SearchParams): Promise<InscriptionRepositoryContract.SearchResult> {
            return Promise.resolve(undefined);
        }

        async update(entity: Inscription): Promise<void> {

            let inscriptionStatus

            switch (entity.status.value.name) {
                case Status.Approved:
                    inscriptionStatus = InscriptionStatus.Approved;
                    break;
                case Status.Denied:
                    inscriptionStatus = InscriptionStatus.Denied;
                    break;
                case Status.Pendent:
                    inscriptionStatus = InscriptionStatus.Pendent;
                    break;
                default:
                    throw new Error(`Invalid status: ${entity.status.value.name}`);
            }

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
    }

    export class InscriptionModelMapper {
        static toEntity(model: InscriptionPrismaModel) {
            try {
                const {id_inscription, ...otherData} = model;
                let domainStatus
                if (otherData.status === InscriptionStatus.Approved) {
                    domainStatus = new InscriptionDomainStatus({name: Status.Approved})
                }
                if (otherData.status === InscriptionStatus.Denied) {
                    domainStatus = new InscriptionDomainStatus({name: Status.Denied})
                }
                if (otherData.status === InscriptionStatus.Pendent) {
                    domainStatus = new InscriptionDomainStatus({name: Status.Pendent})
                }
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