import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {User, UserRepository} from "#user/domain";

export namespace UpdateUserUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private userRepository: UserRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const entity = await this.userRepository.findById(input.id);
            entity.update(input);

            if (input.is_active === true) {
                entity.activate();
            }

            if (input.is_active === false) {
                entity.deactivate();

            }

            await this.userRepository.update(entity);

            return this.toOutput(entity);
        }

        private toOutput(entity: User): Output {
            return entity.toJSON();
        }
    }

    export type Input = {
        id: string; first_name?: string; last_name?: string; password?: string; is_active?: boolean;
    };

    export type Output = {
        first_name: string; last_name: string;
    };
}

export default UpdateUserUseCase;
