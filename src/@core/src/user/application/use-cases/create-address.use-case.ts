import {default as DefaultUseCase} from "../../../@seedwork/application/use-case";
import UserRepository from "../../domain/repository/user-repository";
import {AddressOutput} from "../dto";
import {Address} from "../../domain/value-objects";

export namespace CreateAddressUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private userRepository: UserRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            input.created_at = input.created_at ?? new Date()
            const entity = await this.userRepository.findById(input.id);
            entity.change_address(new Address(input))
            await this.userRepository.addAddress(entity);
            return input;
        }

    }

    export type Input = {
        id: string;
        number: string;
        street: string;
        description?: string;
        postal_code: string;
        created_at?: Date;
    };

    export type Output = AddressOutput;
}

export default CreateAddressUseCase;
