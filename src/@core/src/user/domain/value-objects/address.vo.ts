import {EntityValidationError, ValueObject} from "#seedwork/domain";
import {AddressValidatorFactory} from "#user/domain";


export type AddressProperties = {
    number: string;
    street: string;
    description?: string;
    postal_code: string;
    created_at?: Date;
};

export class Address extends ValueObject<AddressProperties> {
    constructor(value: AddressProperties) {
        super(value);
        this.validate(value)
    }

    private validate(props: AddressProperties) {
        const validator = AddressValidatorFactory.create()
        const isValid = validator.validate(props)
        if (!isValid) {
            throw new EntityValidationError(validator.errors);
        }
    }

}