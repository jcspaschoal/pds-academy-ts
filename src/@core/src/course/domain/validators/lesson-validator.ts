import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength} from "class-validator";
import {LessonProps, LessonPropsUpdate} from "#course/domain";
import {ClassValidatorFields} from "#seedwork/domain";

export class LessonValidatorRules {

    @MaxLength(100)
    @MinLength(1)
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsUUID("4")
    @IsNotEmpty()
    moduleId: string;

    @IsNumber()
    @IsNotEmpty()
    order: number

    @IsDate()
    @IsOptional()
    createdAt?: Date;


    constructor({name, moduleId, order, createdAt}: LessonProps) {
        Object.assign(this, {name, moduleId, order, createdAt});
    }
}


export class LessonUpdateValidatorRules {


    @MaxLength(100)
    @MinLength(1)
    @IsOptional()
    @IsString()
    name: string;

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    order: number

    constructor({name, order}: LessonPropsUpdate) {
        Object.assign(this, {name, order});
    }
}


export class LessonValidator extends ClassValidatorFields<LessonValidatorRules> {
    validate(data: any): boolean {
        return super.validate(new LessonValidatorRules(data ?? ({} as any)));
    }
}


export class LessonUpdateValidator extends ClassValidatorFields<LessonUpdateValidatorRules> {
    validate(data: any): boolean {
        return super.validate(new LessonUpdateValidatorRules(data ?? ({} as any)));
    }
}

const lessonValidators = {
    create: LessonValidator,
    update: LessonUpdateValidator
}

export type LessonValidatorsTypes = keyof typeof lessonValidators;


export class LessonValidatorFactory {
    static create(validator: LessonValidatorsTypes) {
        const classValidator = lessonValidators[validator]
        if (!classValidator) throw new Error("Invalid validator");
        return new classValidator();
    }
}