import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from "../../../@seedwork/domain";
import { User } from "../entities";

export namespace UserRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<User, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      User,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default UserRepository;
