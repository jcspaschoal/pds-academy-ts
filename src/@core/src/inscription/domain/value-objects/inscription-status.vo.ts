import {ValueObject} from "#seedwork/domain";
import {InvalidInscriptionStatus} from "#inscription/domain";

export enum Status {
    Denied = 'Denied', Approved = 'Approved', Pendent = 'Pendent'
}

export type InscriptionStatusProps = {
    name: Status
}

export class InscriptionStatus extends ValueObject<InscriptionStatusProps> {
    constructor(value: InscriptionStatusProps) {
        super(value);
    }

    private validate() {
        const isValid = this.value.name === Status.Denied || Status.Approved || Status.Pendent;
        if (!isValid) {
            throw new InvalidInscriptionStatus(this.value.name)
        }
    }

}