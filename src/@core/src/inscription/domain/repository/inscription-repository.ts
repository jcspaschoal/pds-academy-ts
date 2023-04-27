import {
    SearchableRepositoryInterface,
    SearchParams as DefaultSearchParams,
    SearchResult as DefaultSearchResult,
} from "#seedwork/domain";
import {Inscription} from "#inscription/domain/entities";


export namespace InscriptionRepository {
    export type Filter = string;

    export class SearchParams extends DefaultSearchParams<Filter> {
    }

    export class SearchResult extends DefaultSearchResult<Inscription, Filter> {
    }

    export interface Repository
        extends SearchableRepositoryInterface<
            Inscription,
            Filter,
            SearchParams,
            SearchResult
        > {

    }
}

