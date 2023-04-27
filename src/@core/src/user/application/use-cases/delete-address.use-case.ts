import {default as DefaultUseCase} from "../../../@seedwork/application/use-case";
import {UserRepository} from "#user/domain";

export namespace DeleteAddressUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private userRepository: UserRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const address = await this.userRepository.deleteAddress(input.id);
        }

    }

    export type Input = {
        id: string;
    };

    export type Output = void;
}

export default DeleteAddressUseCase;
