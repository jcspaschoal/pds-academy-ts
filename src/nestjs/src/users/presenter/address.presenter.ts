import {AddressOutput} from '@pds/academy-core/src/user/application/dto';

export class AddressPresenter {
    number: string;
    street: string;
    description?: string;
    postal_code: string;

    constructor(addressOutput: AddressOutput) {
        this.number = addressOutput.number;
        this.street = addressOutput.street;
        this.description = addressOutput.description;
        this.postal_code = addressOutput.postal_code;
    }
}
