import {AnsweredQuestion, AnsweredQuestionProps, UserExamProps} from "../value-objects";
import {IsDate, IsNotEmpty, IsNumber, IsUUID, ValidateNested} from "class-validator";
import {ClassValidatorFields} from "#seedwork/domain";
import {AnsweredQuestionValidatorRules} from "./answered-question.validator";


export class UserExamValidatorRules {


    @IsUUID("4")
    @IsNotEmpty()
    userId: string;

    @IsUUID("4")
    @IsNotEmpty()
    examId: string;

    @IsNumber()
    @IsNotEmpty()
    score: number;

    @IsDate()
    @IsNotEmpty()
    examDate: Date;

    @IsNotEmpty()
    answeredQuestions: AnsweredQuestion[];

    constructor({userId, examId,score , examDate, answeredQuestions}: UserExamProps) {
        Object.assign(this, {userId, examId, score, examDate, answeredQuestions})
    }

}

export class UserExamValidator extends ClassValidatorFields<UserExamValidatorRules> {
    validate(data: any): boolean {
        return super.validate(new UserExamValidatorRules(data ?? ({} as any)));
    }
}

export class UserExamValidatorFactory {
    static create() {
        return new UserExamValidator();
    }
}
