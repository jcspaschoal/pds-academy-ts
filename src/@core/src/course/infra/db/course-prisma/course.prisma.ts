import {Course, CourseRepository as CourseRepositoryContract, Description} from "#course/domain";
import {EntityValidationError, LoadEntityError, NotFoundError, UniqueEntityId} from "#seedwork/domain";
import {Course as CourseModelPrisma, PrismaClient} from "@prisma/client";

export namespace CoursePrisma {
    export class CoursePrismaRepository implements CourseRepositoryContract.Repository {
        sortableFields: string[];

        constructor(private prisma: PrismaClient) {
        }

        bulkInsert(entities: Course[]): Promise<void> {
            return Promise.resolve(undefined);
        }

        delete(id: string | UniqueEntityId): Promise<void> {
            return Promise.resolve(undefined);
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

        findCourseByOwnerId(userId: string): Promise<Course> {
            return Promise.resolve(undefined);
        }

        findCoursesByUserId(userId: string): CourseRepositoryContract.SearchResult {
            return undefined;
        }

        async insert(entity: Course): Promise<void> {

            const description = entity.getDescription()

            await this.prisma.course.create({
                data: {
                    id_course: entity.id,
                    user_id: entity.props.userId,
                    name: entity.name,
                    min_score: entity.minScore,
                    description: description?.value.text ? description.value.text : "null"
                }
            })
        }

        async joinCourse(userId: string, courseId: string): Promise<void> {
            this.prisma.userHasCourse.create({
                data: {
                    user_id: userId,
                    course_id: courseId
                }
            })
        }

        search(props: CourseRepositoryContract.SearchParams): Promise<CourseRepositoryContract.SearchResult> {
            return Promise.resolve(undefined);
        }

        update(entity: Course): Promise<void> {
            return Promise.resolve(undefined);
        }

    }

    export class CourseModelMapper {
        static toEntity(courseModel: CourseModelPrisma): Course {
            try {
                const {id_course, ...otherData} = courseModel;

                return new Course({
                    userId: otherData.user_id,
                    description: new Description({text: otherData.description}),
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