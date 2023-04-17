import { default as DefaultUseCase } from "../../../@seedwork/application/use-case";
import UserRepository from "../../domain/repository/user-repository";
import { UserOutput, UserOutputMapper } from "../dto";
import { User } from "../../domain";

export namespace DeleteUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.userRepository.delete(input.id);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = void;
}

export default DeleteUserUseCase;
