import {
    CourseModule,
    CourseModuleRepository as CourseModuleRepositoryContract,
    Description,
    Lesson
} from "#course/domain";
import {
    ConstraintValidationError,
    EntityValidationError,
    LoadEntityError,
    NotFoundError,
    UniqueEntityId
} from "#seedwork/domain";
import {Prisma, PrismaClient} from "@prisma/client";
import {CourseModule as CourseModulePrismaModel, Lesson as LessonModelPrisma} from ".prisma/client";

export namespace CourseModulePrisma {
    export class CourseModulePrismaRepository implements CourseModuleRepositoryContract.Repository {
        sortableFields: string[];


        constructor(private prisma: PrismaClient) {
        }

        bulkInsert(entities: CourseModule[]): Promise<void> {
            return Promise.resolve(undefined);
        }

        async delete(id: string | UniqueEntityId): Promise<void> {
            const idValue = id instanceof UniqueEntityId ? id.id : id;
            try {
                await this.prisma.courseModule.delete({
                    where: {
                        id_module: idValue
                    }
                })
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                    throw new ConstraintValidationError("Unable to leave the course. Please ensure that the course or user exists.")
                }
            }
        }

        findAll(): Promise<CourseModule[]> {
            return Promise.resolve([]);
        }

        async findById(id: string | UniqueEntityId): Promise<CourseModule> {
            const idValue = id instanceof UniqueEntityId ? id.id : id;
            const output = await this.prisma.courseModule.findFirst(
                {
                    where: {
                        id_module: idValue
                    }
                }
            );

            if (!output) {
                throw new NotFoundError(`Failed to find course module`);
            }
            return CourseModuleModelMapper.toEntity(output)
        }

        async insert(entity: CourseModule): Promise<void> {
            await this.prisma.courseModule.create(
                {
                    data: {
                        id_module: entity.id,
                        course_id: entity.props.courseId,
                        description: entity.props.description?.value.text ? entity.props.description.value.text : null,
                        order: entity.order,
                        name: entity.name
                    }
                }
            )
        }

        search(props: CourseModuleRepositoryContract.SearchParams): Promise<CourseModuleRepositoryContract.SearchResult> {
            return Promise.resolve(undefined);
        }

        async searchModulesByCourseID(courseId: string, props: CourseModuleRepositoryContract.SearchParams): Promise<CourseModuleRepositoryContract.SearchResult> {
            const offset = (props.page - 1) * props.per_page
            const limit = props.per_page
            const sort_dir = props.sort_dir ?? "desc"
            const paginatedCourseModule = await this.prisma.courseModule.findMany(
                {
                    where: {
                        course_id: courseId
                    },
                    include: {
                        lesson: true
                    },
                    skip: offset,
                    take: limit,
                    orderBy: [
                        {
                            created_at: sort_dir,
                        },
                        {
                            order: sort_dir
                        }
                    ]
                }
            );

            if (!paginatedCourseModule) {
                throw new NotFoundError(`Failed to find course module`);
            }


            return new CourseModuleRepositoryContract.SearchResult({
                items: paginatedCourseModule.map((m) => CourseModuleModelMapper.toEntity(m, m.lesson)),
                current_page: props.page,
                per_page: props.per_page,
                total: await this.prisma.inscription.count(),
                filter: props.filter,
                sort: props.sort,
                sort_dir: sort_dir,
            });
        }

        update(entity: CourseModule): Promise<void> {
            return Promise.resolve(undefined);
        }

    }

    export class CourseModuleModelMapper {
        static toEntity(courseModel: CourseModulePrismaModel, lessons?: LessonModelPrisma[]): CourseModule {
            try {
                const {id_module, ...otherData} = courseModel;
                return new CourseModule({
                    courseId: otherData.course_id,
                    description: otherData?.description ? new Description({text: otherData.description}) : null,
                    name: otherData.name,
                    order: otherData.order,
                    createdAt: otherData.created_at,
                    lessons: lessons ? lessons.map((lesson) => LessonModelMapper.toEntity(lesson)) : []
                }, new UniqueEntityId(id_module))
            } catch (e) {
                if (e instanceof EntityValidationError) {
                    throw new LoadEntityError(e.error);
                }
                throw e;
            }
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