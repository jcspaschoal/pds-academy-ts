import {AnsweredQuestion} from "#exam/domain";
import {ValueObject, ValueObjectValidationError} from "#seedwork/domain";
import {UserExamValidatorFactory} from "#exam/domain";


export type UserExamProps = {
    userId: string;
    examId: number;
    examUUID: string;
    examDate: Date;
    answeredQuestions: AnsweredQuestion[];
    score: number;
}

export class UserExam extends ValueObject<UserExamProps> {

    constructor(value: UserExamProps) {
        super(value);
        this.validate(value);
    }

    private validate(props: UserExamProps) {
        const validator = UserExamValidatorFactory.create()
        const isValid = validator.validate(props)
        if (!isValid) {
            throw new ValueObjectValidationError(validator.errors);
        }
    }
}