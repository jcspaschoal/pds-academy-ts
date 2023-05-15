import {Lesson, LessonRepository as LessonRepositoryContract} from "#course/domain";
import {UniqueEntityId} from "#seedwork/domain";
import {PrismaClient} from "@prisma/client";

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

        findById(id: string | UniqueEntityId): Promise<Lesson> {
            return Promise.resolve(undefined);
        }

        insert(entity: Lesson): Promise<void> {
            return Promise.resolve(undefined);
        }

        search(props: LessonRepositoryContract.SearchParams): Promise<LessonRepositoryContract.SearchResult> {
            return Promise.resolve(undefined);
        }

        searchLessonsByModuleId(moduleId: string, SearchParams): Promise<LessonRepositoryContract.SearchResult> {
            return Promise.resolve(undefined);
        }

        update(entity: Lesson): Promise<void> {
            return Promise.resolve(undefined);
        }


    }
}