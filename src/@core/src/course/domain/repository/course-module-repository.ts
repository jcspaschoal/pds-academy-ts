import {
    SearchableRepositoryInterface,
    SearchParams as DefaultSearchParams,
    SearchResult as DefaultSearchResult
} from "#seedwork/domain";
import {CourseModule} from "#course/domain";

export namespace CourseModuleRepository {
    export type Filter = string

    export class SearchParams extends DefaultSearchParams<Filter> {
    }

    export class SearchResult extends DefaultSearchResult<CourseModule, Filter> {
    }

    export interface Repository
        extends SearchableRepositoryInterface<
            CourseModule,
            Filter,
            SearchParams,
            SearchResult
        > {

        searchModulesByCourseID(courseId: string, props: SearchParams): Promise<SearchResult>
    }
}