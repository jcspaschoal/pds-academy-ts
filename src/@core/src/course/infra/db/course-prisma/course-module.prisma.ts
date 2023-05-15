import {CourseModule, CourseModuleRepository as CourseModuleRepositoryContract} from "#course/domain";
import {UniqueEntityId} from "#seedwork/domain";
import {PrismaClient} from "@prisma/client";

export namespace CourseModulePrisma {
    export class CourseModulePrismaRepository implements CourseModuleRepositoryContract.Repository {
        sortableFields: string[];


        constructor(private prisma: PrismaClient) {
        }

        bulkInsert(entities: CourseModule[]): Promise<void> {
            return Promise.resolve(undefined);
        }

        delete(id: string | UniqueEntityId): Promise<void> {
            return Promise.resolve(undefined);
        }

        findAll(): Promise<CourseModule[]> {
            return Promise.resolve([]);
        }

        findById(id: string | UniqueEntityId): Promise<CourseModule> {
            return Promise.resolve(undefined);
        }

        insert(entity: CourseModule): Promise<void> {
            return Promise.resolve(undefined);
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