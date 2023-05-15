import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength} from "class-validator";
import {CourseModuleProps, CourseUpdateProps} from "#course/domain";
import {ClassValidatorFields} from "#seedwork/domain";

export class CourseModuleValidatorRules {

    @MaxLength(100)
    @MinLength(1)
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsUUID("4")
    @IsNotEmpty()
    @IsString()
    courseId: string;

    @IsNumber()
    @IsNotEmpty()
    order: number

    @IsDate()
    @IsOptional()
    createdAt?: Date;


    constructor({name, courseId, order, createdAt}: CourseModuleProps) {
        Object.assign(this, {name, courseId, order, createdAt});
    }
}


export class CourseModuleUpdateValidatorRules {


    @MaxLength(100)
    @MinLength(1)
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsUUID("4")
    @IsNotEmpty()
    @IsString()
    courseId: string;

    @IsNumber()
    @IsNotEmpty()
    order: number

    constructor({name, minScore}: CourseUpdateProps) {
        Object.assign(this, {name, minScore});
    }
}


export class CourseModuleValidator extends ClassValidatorFields<CourseModuleValidatorRules> {
    validate(data: any): boolean {
        return super.validate(new CourseModuleValidatorRules(data ?? ({} as any)));
    }
}


export class CourseUpdateModuleValidator extends ClassValidatorFields<CourseModuleUpdateValidatorRules> {
    validate(data: any): boolean {
        return super.validate(new CourseModuleUpdateValidatorRules(data ?? ({} as any)));
    }
}

const courseModuleValidators = {
    create: CourseModuleValidator,
    update: CourseUpdateModuleValidator
}

export type CourseModuleValidatorsTypes = keyof typeof courseModuleValidators;


export class CourseModuleValidatorFactory {
    static create(validator: CourseModuleValidatorsTypes) {
        const classValidator = courseModuleValidators[validator]
        if (!classValidator) throw new Error("Invalid validator");
        return new classValidator();
    }
}