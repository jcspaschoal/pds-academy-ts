import {default as DefaultUseCase} from "@seedwork/application/use-case";
import {InscriptionOutputDto} from "../dto";
import {Document, Inscription, InscriptionRepository} from "#inscription/domain";

export namespace CreateInscriptionUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private inscriptionRepository: InscriptionRepository.Repository) {
        }

        async execute(input: Input): Promise<Output> {
            const entity = new Inscription({
                userId: input.userId, document: new Document({pathToDocument: input.documentPath})
            });
            const idInscription = await this.inscriptionRepository.upsert(entity);
            return {id: idInscription, status: entity.status};
        }
    }

    export type Input = {
        userId: string; documentPath: string;
    };

    export type Output = InscriptionOutputDto;
}

export default CreateInscriptionUseCase;
