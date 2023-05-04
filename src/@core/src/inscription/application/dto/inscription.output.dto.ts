import {Inscription, InscriptionStatus} from "#inscription/domain";

export type InscriptionOutputDto = {
    id: string;
    created_at?: Date;
    status: InscriptionStatus

};

export class InscriptionOutputMapper {
    static toOutput(entity: Inscription): InscriptionOutputDto {
        return entity.toJSON();
    }
}
