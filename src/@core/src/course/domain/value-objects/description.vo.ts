import {ValueObject, ValueObjectValidationError} from "#seedwork/domain";
import {DescriptionValidatorFactory} from "../validators";

export type DescriptionProps = {
    text: string
}

export class Description extends ValueObject<DescriptionProps> {

    constructor(value: DescriptionProps) {
        super(value);
        this.validate(value)
    }

    private validate(props: DescriptionProps) {
        const validator = DescriptionValidatorFactory.create()
        const isValid = validator.validate(props)
        if (!isValid) {
            throw new ValueObjectValidationError(validator.errors);
        }
    }
}