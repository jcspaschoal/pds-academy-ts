import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {InscriptionRepository} from "#inscription/domain";

export namespace UploadFileUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private inscriptionRepository: InscriptionRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            await this.inscriptionRepository.updateFilePath(input.userId, input.path);
        }

    }

    export type Input = {
        userId: string; path: string;
    };

    export type Output = void;
}

export default UploadFileUseCase;
