import {
    SearchableRepositoryInterface,
    SearchParams as DefaultSearchParams,
    SearchResult as DefaultSearchResult
} from "#seedwork/domain";
import {Course} from "#course/domain";

export namespace CourseRepository {
    export type Filter = string

    export class SearchParams extends DefaultSearchParams<Filter> {
    }

    export class SearchResult extends DefaultSearchResult<Course, Filter> {
    }

    export interface Repository
        extends SearchableRepositoryInterface<
            Course,
            Filter,
            SearchParams,
            SearchResult
        > {

        joinCourse(userId: string, courseId: string): Promise<void>;

        findCoursesByUserId(userId: string, props: SearchParams): Promise<SearchResult>;

        leaveCourse(userId: string, courseId: string): Promise<void>;

    }
}

