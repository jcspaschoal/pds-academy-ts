import {ValueObject, ValueObjectValidationError} from "#seedwork/domain";

export type CategoryProps = {
    name: string
}

export class Category extends ValueObject<CategoryProps> {

    constructor(value: CategoryProps) {
        super(value);
    }
}