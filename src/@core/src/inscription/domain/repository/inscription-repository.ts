import {
    SearchableRepositoryInterface,
    SearchParams as DefaultSearchParams,
    SearchResult as DefaultSearchResult,
    UniqueEntityId,
} from "#seedwork/domain";
import {Inscription} from "#inscription/domain/entities";
import {InscriptionUpdateDto, InscriptionUpdateOutputDto} from "../../application";


export namespace InscriptionRepository {
    export type Filter = string

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
        updateFilePath(id: UniqueEntityId | string, path: string)

        bulkStatusUpdate(adminId: string | UniqueEntityId, inscriptions: InscriptionUpdateDto[]): Promise<InscriptionUpdateOutputDto>

        upsert(entity: Inscription): Promise<string>

        findInscriptionByInscriptionId(id: UniqueEntityId | string): Promise<Inscription>;

    }
}

