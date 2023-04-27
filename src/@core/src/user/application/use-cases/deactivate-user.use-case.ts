import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {UserRepository} from "#user/domain";

export namespace DeactivateUserUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private userRepository: UserRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const user = await this.userRepository.findById(input.id)
            user.deactivate()
            await this.userRepository.update(user)
        }
    }

    export type Input = {
        id: string;
    };

    export type Output = void;
}

export default DeactivateUserUseCase;
