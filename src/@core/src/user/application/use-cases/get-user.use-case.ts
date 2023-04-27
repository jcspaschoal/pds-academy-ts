import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {Group, User, UserRepository} from "#user/domain";

export namespace GetUserUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private userRepository: UserRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const user = await this.userRepository.findByEmail(input.email);
            return this.toOutput(user)
        }

        private toOutput(entity: User): Output {
            return entity.toJSON();
        }
    }

    export type Input = {
        email: string;
    };

    export type Output = {
        id: string; email: string; password: string; group: Group;
    };
}
