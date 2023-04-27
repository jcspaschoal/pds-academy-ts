import {ValueObject} from "#seedwork/domain";
import {InvalidInscriptionStatus} from "#admin/domain/errors";

export enum Status {
    Denny = 'denny', Approved = 'approved', Pendent = 'pendent'
}

export type InscriptionStatusProps = {
    name: Status
}

export class InscriptionStatus extends ValueObject<InscriptionStatusProps> {
    constructor(value: InscriptionStatusProps) {
        super(value);
    }

    private validate() {
        const isValid = this.value.name === Status.Denny || Status.Approved || Status.Pendent;
        if (!isValid) {
            throw new InvalidInscriptionStatus(this.value.name)
        }
    }

}