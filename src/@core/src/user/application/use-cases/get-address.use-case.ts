import {default as DefaultUseCase} from "../../../@seedwork/application/use-case";
import UserRepository from "../../domain/repository/user-repository";
import {AddressOutput} from "../dto";
import {Address} from "../../domain/value-objects";

export namespace GetAddressUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private userRepository: UserRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const user = await this.userRepository.getAddress(input.id);
            return user.address.value
        }

    }

    export type Input = {
        id: string;
    };

    export type Output = AddressOutput;
}

export default GetAddressUseCase;
