import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {InscriptionOutputDto, InscriptionOutputMapper} from "../dto";
import {InscriptionRepository} from "#inscription/domain";

export namespace FindInscriptionByInscriptionIdUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private inscriptionRepository: InscriptionRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const entity = await this.inscriptionRepository.findInscriptionByInscriptionId(input.inscriptionId);
            return InscriptionOutputMapper.toOutput(entity);
        }

    }

    export type Input = {
        inscriptionId: string;
    };

    export type Output = InscriptionOutputDto;
}

export default FindInscriptionByInscriptionIdUseCase;
