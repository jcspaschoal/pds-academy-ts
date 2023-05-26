import {Description, Lesson, LessonRepository as LessonRepositoryContract} from "#course/domain";
import {EntityValidationError, LoadEntityError, NotFoundError, UniqueEntityId} from "#seedwork/domain";
import {PrismaClient} from "@prisma/client";
import {Lesson as LessonModelPrisma} from ".prisma/client";

export namespace LessonPrisma {
    export class LessonPrismaRepository implements LessonRepositoryContract.Repository {
        sortableFields: string[];

        constructor(private prisma: PrismaClient) {
        }

        bulkInsert(entities: Lesson[]): Promise<void> {
            return Promise.resolve(undefined);
        }

        delete(id: string | UniqueEntityId): Promise<void> {
            return Promise.resolve(undefined);
        }

        findAll(): Promise<Lesson[]> {
            return Promise.resolve([]);
        }

        async findById(id: string | UniqueEntityId): Promise<Lesson> {
            const idValue = id instanceof UniqueEntityId ? id.id : id;
            const output = await this.prisma.lesson.findFirst(
                {
                    where: {
                        id_lesson: idValue
                    }
                }
            );

            if (!output) {
                throw new NotFoundError(`Failed to find lesson`);
            }
            return LessonModelMapper.toEntity(output)
        }

        async insert(entity: Lesson): Promise<void> {
            await this.prisma.lesson.create(
                {
                    data: {
                        name: entity.name,
                        module_id: entity.props.moduleId,
                        description: entity.props.description?.value.text ? entity.props.description.value.text : null,
                        id_lesson: entity.id,
                        lesson_order: entity.order
                    }
                }
            )
        }

        search(props: LessonRepositoryContract.SearchParams): Promise<LessonRepositoryContract.SearchResult> {
            return Promise.resolve(undefined);
        }

        async searchLessonsByModuleId(moduleId: string, props: LessonRepositoryContract.SearchParams): Promise<LessonRepositoryContract.SearchResult> {
            const offset = (props.page - 1) * props.per_page
            const limit = props.per_page
            const sort_dir = props.sort_dir ?? "desc"
            const paginatedInscriptions = await this.prisma.lesson.findMany(
                {
                    where: {
                        module_id: moduleId
                    },
                    skip: offset,
                    take: limit,
                    orderBy: [
                        {
                            created_at: sort_dir,
                            lesson_order: sort_dir,
                        }
                    ]
                }
            )

            return new LessonRepositoryContract.SearchResult({
                items: paginatedInscriptions.map((m) => LessonModelMapper.toEntity(m)),
                current_page: props.page,
                per_page: props.per_page,
                total: await this.prisma.inscription.count(),
                filter: props.filter,
                sort: props.sort,
                sort_dir: sort_dir,
            });
        }

        update(entity: Lesson): Promise<void> {
            return Promise.resolve(undefined);
        }
    }

    export class LessonModelMapper {
        static toEntity(lessonModel: LessonModelPrisma): Lesson {
            try {
                const {id_lesson, ...otherData} = lessonModel;
                return new Lesson({
                    moduleId: otherData.module_id,
                    description: otherData?.description ? new Description({text: otherData.description}) : null,
                    name: otherData.name,
                    order: otherData.lesson_order,
                    createdAt: otherData.created_at
                }, new UniqueEntityId(id_lesson))
            } catch (e) {
                if (e instanceof EntityValidationError) {
                    throw new LoadEntityError(e.error);
                }
                throw e;
            }
        }
    }
}