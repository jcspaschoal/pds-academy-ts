import {AnsweredQuestionProps} from "../value-objects";
import {IsNotEmpty, IsNumber, IsString, Length, Max, Min} from "class-validator";
import {ClassValidatorFields} from "#seedwork/domain";


export class AnsweredQuestionValidatorRules {


    @IsNotEmpty()
    @Min(1)
    @IsNumber()
    questionNumber: number;

    @IsString()
    @IsNotEmpty()
    @Length(1, 1)
    questionAnswer: string;


    constructor({questionNumber, questionAnswer}: AnsweredQuestionProps) {
        Object.assign(this, {questionNumber, questionAnswer})
    }

}

export class AnsweredQuestionValidator extends ClassValidatorFields<AnsweredQuestionValidatorRules> {
    validate(data: any): boolean {
        return super.validate(new AnsweredQuestionValidatorRules(data ?? ({} as any)));
    }
}

export class AnsweredQuestionValidatorFactory {
    static create() {
        return new AnsweredQuestionValidator();
    }
}
