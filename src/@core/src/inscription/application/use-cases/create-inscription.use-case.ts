import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {InscriptionOutputDto, InscriptionOutputMapper} from "../dto";
import {Document, Inscription, InscriptionRepository} from "#inscription/domain";

export namespace CreateInscriptionUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private inscriptionRepository: InscriptionRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const entity = new Inscription({
                userId: input.userId, document: new Document({pathToDocument: input.documentPath})
            });
            await this.inscriptionRepository.insert(entity);
            return InscriptionOutputMapper.toOutput(entity);
        }

    }

    export type Input = {
        userId: string; documentPath: string;
    };

    export type Output = InscriptionOutputDto;
}

export default CreateInscriptionUseCase;
