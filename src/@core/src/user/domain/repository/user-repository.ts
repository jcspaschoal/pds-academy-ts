import {
    SearchableRepositoryInterface,
    SearchParams as DefaultSearchParams,
    SearchResult as DefaultSearchResult,
} from "#seedwork/domain";
import {User} from "../entities";
import UniqueEntityId from "@seedwork/domain/value-objects/unique-entity-id.vo";

export namespace UserRepository {
    export type Filter = string;

    export class SearchParams extends DefaultSearchParams<Filter> {
    }

    export class SearchResult extends DefaultSearchResult<User, Filter> {
    }

    export interface Repository
        extends SearchableRepositoryInterface<
            User,
            Filter,
            SearchParams,
            SearchResult
        > {

        findByEmail(email: string): Promise<User>;

        deleteAddress(id: string | UniqueEntityId): Promise<void>;

        getAddress(id: string | UniqueEntityId): Promise<User>;

        updateAddress(entity: User): Promise<void>;

        addAddress(entity: User): Promise<void>;

        getStatistics(): Promise<any>;

    }
}

export default UserRepository;
