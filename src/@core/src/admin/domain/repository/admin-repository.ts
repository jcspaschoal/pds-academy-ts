import {
    BasicSearchableRepositoryInterface,
    SearchParams as DefaultSearchParams,
    SearchResult as DefaultSearchResult,
} from "#seedwork/domain";
import {Admin} from "../entities";


export namespace AdminRepository {
    export type Filter = string;

    export class SearchParams extends DefaultSearchParams<Filter> {
    }

    export class SearchResult extends DefaultSearchResult<Admin, Filter> {
    }

    export interface Repository
        extends BasicSearchableRepositoryInterface<
            Admin,
            Filter,
            SearchParams,
            SearchResult
        > {

    }
}