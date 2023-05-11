import {ValueObject} from "#seedwork/domain";
import {InvalidInscriptionStatus} from "#inscription/domain";

export enum Status {
    Denied = 'Denied', Approved = 'Approved', Pendent = 'Pendent'
}


export class InscriptionStatus extends ValueObject<Status> {
    constructor(value: Status) {
        super(value);
    }

    private validate() {
        const isValid = this.value === Status.Denied || Status.Approved || Status.Pendent;
        if (!isValid) {
            throw new InvalidInscriptionStatus(this.value)
        }
    }

}