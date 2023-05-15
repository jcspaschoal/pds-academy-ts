import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength} from "class-validator";
import {ClassValidatorFields} from "#seedwork/domain";
import {CourseProps, CourseUpdateProps} from "#course/domain";


export class CourseValidatorRules {

    @MaxLength(100)
    @MinLength(1)
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsUUID("4")
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNumber()
    @IsOptional()
    minScore?: number;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    constructor({name, userId, minScore, createdAt}: CourseProps) {
        Object.assign(this, {name, userId, minScore, createdAt});
    }
}


export class CourseUpdateValidatorRules {

    @MaxLength(100)
    @MinLength(1)
    @IsOptional()
    @IsString()
    name: string;

    @IsNumber()
    @IsOptional()
    minScore?: number;

    constructor({name, minScore}: CourseUpdateProps) {
        Object.assign(this, {name, minScore});
    }
}


export class CourseValidator extends ClassValidatorFields<CourseValidatorRules> {
    validate(data: any): boolean {
        return super.validate(new CourseValidatorRules(data ?? ({} as any)));
    }
}


export class CourseUpdateValidator extends ClassValidatorFields<CourseUpdateValidatorRules> {
    validate(data: any): boolean {
        return super.validate(new CourseUpdateValidatorRules(data ?? ({} as any)));
    }
}

const courseValidators = {
    create: CourseValidator,
    update: CourseUpdateValidator
}

export type CourseValidatorsTypes = keyof typeof courseValidators


export class CourseValidatorFactory {
    static create(validator: CourseValidatorsTypes) {
        const classValidator = courseValidators[validator]
        if (!classValidator) throw new Error("Invalid validator");
        return new classValidator();
    }
}