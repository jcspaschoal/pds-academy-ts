import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {Address, UserRepository} from "#user/domain";
import {AddressOutput} from "../dto";

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
        id: string; number: string; street: string; description?: string; postal_code: string; created_at?: Date;
    };

    export type Output = AddressOutput;
}

export default CreateAddressUseCase;
