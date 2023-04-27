import {UniqueEntityId} from "#seedwork/domain";
import entity from "#seedwork/domain/entity/entity";

export type AdminProps = {
    userId: UniqueEntityId | string
    analysedInscriptions: UniqueEntityId[] | string[],
}

export class Admin extends entity<AdminProps> {


    constructor(public readonly props: AdminProps, id?: UniqueEntityId) {
        super(props, id);
    }

}