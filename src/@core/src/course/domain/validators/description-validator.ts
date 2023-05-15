import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";
import {DescriptionProps} from "#course/domain/value-objects";
import {ClassValidatorFields} from "#seedwork/domain";


export class DescriptionRules {

    @MaxLength(500)
    @MinLength(1)
    @IsString()
    @IsNotEmpty()
    text: string

    constructor({text}: DescriptionProps) {
        Object.assign(this, {text});
    }
}

export class DescriptionValidator extends ClassValidatorFields<DescriptionRules> {
    validate(data: any): boolean {
        return super.validate(new DescriptionRules(data ?? ({} as any)));
    }
}

export class DescriptionValidatorFactory {
    static create() {
        return new DescriptionValidator();
    }
}