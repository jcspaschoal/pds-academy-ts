import {Course, CourseRepository as CourseRepositoryContract, Description} from "#course/domain";
import {
    ConstraintValidationError,
    EntityValidationError,
    LoadEntityError,
    NotFoundError,
    UniqueEntityId
} from "#seedwork/domain";
import {Course as CourseModelPrisma, Prisma, PrismaClient} from "@prisma/client";

export namespace CoursePrisma {
    export class CoursePrismaRepository implements CourseRepositoryContract.Repository {
        sortableFields: string[];

        constructor(private prisma: PrismaClient) {
        }

        bulkInsert(entities: Course[]): Promise<void> {
            return Promise.resolve(undefined);
        }

        async delete(id: string | UniqueEntityId): Promise<void> {
            const idValue = id instanceof UniqueEntityId ? id.id : id;

            try {
                await this.prisma.$transaction([
                    this.prisma.course.delete(
                        {
                            where: {
                                id_course: idValue
                            }
                        }
                    )
                ])
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                    throw new ConstraintValidationError("Unable to delete the course. Please ensure that the course or user exists.")
                }
            }
        }

        findAll(): Promise<Course[]> {
            return Promise.resolve([]);
        }

        async findById(id: string | UniqueEntityId): Promise<Course> {
            const idValue = id instanceof UniqueEntityId ? id.id : id;
            const output = await this.prisma.course.findFirst(
                {
                    where: {
                        id_course: idValue
                    }
                }
            )
            if (!output) {
                throw new NotFoundError(`Failed to find course`);
            }
            return CourseModelMapper.toEntity(output)

        }

        async insert(entity: Course): Promise<void> {
            const description = entity.getDescription()
            await this.prisma.course.create({
                data: {
                    id_course: entity.id,
                    user_id: entity.props.userId,
                    name: entity.name,
                    min_score: entity.minScore,
                    description: description?.value.text ? description.value.text : null
                }
            })
        }

        async leaveCourse(userId: string, courseId: string): Promise<void> {
            try {
                await this.prisma.userHasCourse.delete(
                    {
                        where: {
                            course_id_user_id: {
                                course_id: courseId,
                                user_id: userId
                            }
                        }
                    }
                )
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                    throw new ConstraintValidationError("Unable to leave the course. Please ensure that the course or user exists.")
                }
            }
        }

        async joinCourse(userId: string, courseId: string): Promise<void> {
            try {
                await this.prisma.userHasCourse.create({
                    data: {
                        user_id: userId,
                        course_id: courseId
                    }
                })
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                    throw new ConstraintValidationError("User already enrolled in the course.")
                }
            }
        }

        async search(props: CourseRepositoryContract.SearchParams): Promise<CourseRepositoryContract.SearchResult> {
            const offset = (props.page - 1) * props.per_page
            const limit = props.per_page
            const sort_dir = props.sort_dir ?? "desc"
            const paginatedInscriptions = await this.prisma.course.findMany(
                {
                    skip: offset,
                    take: limit,
                    orderBy: [
                        {
                            created_at: sort_dir
                        }
                    ]
                }
            )

            return new CourseRepositoryContract.SearchResult({
                items: paginatedInscriptions.map((m) => CourseModelMapper.toEntity(m)),
                current_page: props.page,
                per_page: props.per_page,
                total: await this.prisma.inscription.count(),
                filter: props.filter,
                sort: props.sort,
                sort_dir: sort_dir,
            });
        }

        async update(entity: Course): Promise<void> {
            const description = entity.getDescription()

            await this.prisma.course.update(
                {
                    where: {
                        id_course: entity.id,
                    },
                    data: {
                        name: entity.name,
                        min_score: entity.minScore,
                        description: description?.value.text ? description.value.text : null,
                    }
                }
            )
        }

        async findCoursesByUserId(userId: string, props: CourseRepositoryContract.SearchParams): Promise<CourseRepositoryContract.SearchResult> {
            const offset = (props.page - 1) * props.per_page
            const limit = props.per_page
            const sort_dir = props.sort_dir ?? "desc"
            const paginatedInscriptions = await this.prisma.userHasCourse.findMany(
                {
                    where: {
                        user_id: userId
                    },
                    include: {
                        Course: true
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

            return new CourseRepositoryContract.SearchResult({
                items: paginatedInscriptions.map((m) => CourseModelMapper.toEntity(m.Course)),
                current_page: props.page,
                per_page: props.per_page,
                total: await this.prisma.inscription.count(),
                filter: props.filter,
                sort: props.sort,
                sort_dir: sort_dir,
            });
        }

        findOwnerByCourseId(userId: string): Promise<Course> {
            return Promise.resolve(undefined);
        }

    }

    export class CourseModelMapper {
        static toEntity(courseModel: CourseModelPrisma): Course {
            try {
                const {id_course, ...otherData} = courseModel;

                return new Course({
                    userId: otherData.user_id,
                    description: otherData?.description ? new Description({text: otherData.description}) : null,
                    name: otherData.name,
                    minScore: otherData.min_score.toNumber(),
                    createdAt: otherData.created_at
                }, new UniqueEntityId(id_course))
            } catch (e) {
                if (e instanceof EntityValidationError) {
                    throw new LoadEntityError(e.error);
                }
                throw e;
            }
        }
    }
}