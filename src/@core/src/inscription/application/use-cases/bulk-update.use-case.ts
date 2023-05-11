import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {InscriptionUpdateDto, InscriptionUpdateOutputDto} from "../dto";
import {InscriptionRepository} from "#inscription/domain";

export namespace BulkStatusUpdateUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private inscriptionRepository: InscriptionRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {

            return await this.inscriptionRepository.bulkStatusUpdate(input.userId, input.inscriptions);
        }

    }

    export type Input = {
        userId: string; inscriptions: InscriptionUpdateDto[]
    };

    export type Output = InscriptionUpdateOutputDto
}

export default BulkStatusUpdateUseCase;
