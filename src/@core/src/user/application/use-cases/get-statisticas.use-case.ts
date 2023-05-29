import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {UserRepository} from "#user/domain";
import {AddressOutput} from "../dto";

export namespace GetStatisticasUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private userRepository: UserRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const output = await this.userRepository.getStatistics();
            return output
        }

    }

    export type Input = void;

    export type Output = any;
}

