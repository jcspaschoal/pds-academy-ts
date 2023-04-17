import { default as DefaultUseCase } from "../../../@seedwork/application/use-case";
import UserRepository from "../../domain/repository/user-repository";
import { UserOutput, UserOutputMapper } from "../dto";
import { User } from "../../domain";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
  SearchInputDto,
} from "../../../@seedwork/application/dto";

export namespace GetUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input);
      const searchResult = await this.userRepository.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: UserRepository.SearchResult): Output {
      const items = searchResult.items.map((i) => {
        return UserOutputMapper.toOutput(i);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }

  export type Input = SearchInputDto;
  export type Output = PaginationOutputDto<UserOutput>;
}
