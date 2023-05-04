import {
    BasicSearchableRepositoryInterface,
    SearchableRepositoryInterface,
    SearchParams as DefaultSearchParams,
    SearchResult as DefaultSearchResult, UniqueEntityId,
} from "#seedwork/domain";
import {Admin} from "../entities";


export namespace AdminRepository {
    export type Filter = string;

    export class SearchParams extends DefaultSearchParams<Filter> {
    }

    export class SearchResult extends DefaultSearchResult<Admin, Filter> {
    }

    export interface Repository extends SearchableRepositoryInterface<Admin, Filter, SearchParams, SearchResult> {
        createInscriptionEntry(userId: string | UniqueEntityId, inscriptionId: string | UniqueEntityId)
    }
}

