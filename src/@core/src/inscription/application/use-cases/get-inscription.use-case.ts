import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {InscriptionOutputDto, InscriptionOutputMapper} from "../dto";
import {Document, Inscription, InscriptionRepository} from "#inscription/domain";

export namespace GetInscriptionUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private inscriptionRepository: InscriptionRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const entity = await this.inscriptionRepository.findById(input.userId);
            return InscriptionOutputMapper.toOutput(entity);
        }

    }

    export type Input = {
        userId: string;
    };

    export type Output = InscriptionOutputDto;
}

export default GetInscriptionUseCase;
