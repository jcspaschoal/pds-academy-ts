import { default as DefaultUseCase } from "../../../@seedwork/application/use-case";
import UserRepository from "../../domain/repository/user-repository";
import { UserOutput } from "../dto";
import { User } from "../../domain";

export namespace CreateUserUserCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = new User(input);
      await this.userRepository.insert(entity);
      return this.toOutput(entity);
    }

    private toOutput(entity: User): Output {
      return entity.toJSON();
    }
  }

  export type Input = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };

  export type Output = UserOutput;
}

export default CreateUserUserCase;
