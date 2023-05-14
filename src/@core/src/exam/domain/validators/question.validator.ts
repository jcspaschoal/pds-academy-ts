import {IsNotEmpty, IsNumber, IsString, Length, Max, MaxLength, Min, MinLength} from "class-validator";
import {ClassValidatorFields} from "#seedwork/domain";
import {QuestionProps} from "../value-objects";


export class QuestionValidatorRules {

    @IsNotEmpty()
    @Min(1)
    @IsNumber()
    questionNumber: number;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(500)
    description: string;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(500)
    optionA: string;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(500)
    optionB: string;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(500)
    optionC: string;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(500)
    optionD: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 1)
    rightAnswer: string;


    constructor({questionNumber, description, optionA, optionB, optionC, optionD, rightAnswer}: QuestionProps) {
        Object.assign(this, {questionNumber, description, optionA, optionB, optionC, optionD, rightAnswer})
    }


}

export class QuestionValidator extends ClassValidatorFields<QuestionValidatorRules> {
    validate(data: any): boolean {
        return super.validate(new QuestionValidatorRules(data ?? ({} as any)));
    }
}

export class QuestionValidatorFactory {
    static create() {
        return new QuestionValidator();
    }
}
