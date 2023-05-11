import {Document, Inscription, InscriptionStatus} from "#inscription/domain";
import {UniqueEntityId} from "#seedwork/domain";

export type InscriptionOutputDto = {
    id: string;
    created_at?: Date;
    status: InscriptionStatus
    document?: Document;
    userId?: string | UniqueEntityId;

};

export class InscriptionOutputMapper {
    static toOutput(entity: Inscription): InscriptionOutputDto {
        return entity.toJSON();
    }
}
