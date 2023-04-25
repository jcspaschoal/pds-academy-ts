import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsBoolean,
    IsOptional,
    IsDate,
    MinLength,
} from "class-validator";

import ClassValidatorFields from "../../../@seedwork/domain/validators/class-validator-fields";
import {AddressProperties} from "../../domain/value-objects/address.vo";

export class AddressRules {

    @MaxLength(45)
    @MinLength(1)
    @IsString()
    @IsNotEmpty()
    number: string;

    @MaxLength(200)
    @MinLength(3)
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    description: string;

    @MaxLength(100)
    @MinLength(4)
    @IsString()
    @IsNotEmpty()
    street: string;


    @MaxLength(100)
    @MinLength(4)
    @IsString()
    @IsNotEmpty()
    postal_code: string;

    @IsDate()
    @IsOptional()
    created_at: Date;

    constructor({number, description, street, postal_code, created_at}: AddressProperties) {
        Object.assign(this, {number, description, street, postal_code, created_at});
    }
}


export class AddressValidator extends ClassValidatorFields<AddressRules> {
    validate(data: any): boolean {
        return super.validate(new AddressRules(data ?? ({} as any)));
    }
}


export class AddressValidatorFactory {
    static create() {
        return new AddressValidator();
    }
}
