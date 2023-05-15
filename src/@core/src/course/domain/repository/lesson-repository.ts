import {
    SearchableRepositoryInterface,
    SearchParams as DefaultSearchParams,
    SearchResult as DefaultSearchResult
} from "#seedwork/domain";
import {Lesson} from "#course/domain";

export namespace LessonRepository {
    export type Filter = string

    export class SearchParams extends DefaultSearchParams<Filter> {
    }

    export class SearchResult extends DefaultSearchResult<Lesson, Filter> {
    }

    export interface Repository
        extends SearchableRepositoryInterface<
            Lesson,
            Filter,
            SearchParams,
            SearchResult
        > {

        searchLessonsByModuleId(moduleId: string, SearchParams): Promise<SearchResult>
    }
}