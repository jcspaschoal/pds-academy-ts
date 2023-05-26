import {CourseModule, CourseModuleRepository as CourseModuleRepositoryContract, Description} from "#course/domain";
import {
    ConstraintValidationError,
    EntityValidationError,
    LoadEntityError,
    NotFoundError,
    UniqueEntityId
} from "#seedwork/domain";
import {Prisma, PrismaClient} from "@prisma/client";
import {CourseModule as CourseModulePrismaModel} from ".prisma/client";

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
                        course_id: idValue
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

        searchModulesByCourseID(courseId: string, SearchParams): Promise<CourseModuleRepositoryContract.SearchResult> {
            return Promise.resolve(undefined);
        }

        update(entity: CourseModule): Promise<void> {
            return Promise.resolve(undefined);
        }

    }

    export class CourseModuleModelMapper {
        static toEntity(courseModel: CourseModulePrismaModel): CourseModule {
            try {
                const {id_module, ...otherData} = courseModel;
                return new CourseModule({
                    courseId: otherData.course_id,
                    description: otherData?.description ? new Description({text: otherData.description}) : null,
                    name: otherData.name,
                    order: otherData.order,
                    createdAt: otherData.created_at
                }, new UniqueEntityId(id_module))
            } catch (e) {
                if (e instanceof EntityValidationError) {
                    throw new LoadEntityError(e.error);
                }
                throw e;
            }
        }
    }
}