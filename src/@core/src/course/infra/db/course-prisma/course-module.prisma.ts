import {CourseModule, CourseModuleRepository as CourseModuleRepositoryContract} from "#course/domain";
import {ConstraintValidationError, UniqueEntityId} from "#seedwork/domain";
import {Prisma, PrismaClient} from "@prisma/client";

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

        findById(id: string | UniqueEntityId): Promise<CourseModule> {
            return Promise.resolve(undefined);
        }

        async insert(entity: CourseModule): Promise<void> {
            await this.prisma.courseModule.create(
                {
                    data: {
                        id_module: entity.id,
                        course_id: entity.props.courseId,
                        description: entity.description.value.text,
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
}