import {ValueObject, ValueObjectValidationError} from "#seedwork/domain";
import {AnsweredQuestionValidatorFactory} from "#exam/domain";


export type AnsweredQuestionProps = {
    questionNumber: number;
    questionAnswer: string;
}

export class AnsweredQuestion extends ValueObject<AnsweredQuestionProps> {

    constructor(value: AnsweredQuestionProps) {
        super(value);
        this.validate(value);
    }

    private validate(props: AnsweredQuestionProps) {
        const validator = AnsweredQuestionValidatorFactory.create()
        const isValid = validator.validate(props)
        if (!isValid) {
            throw new ValueObjectValidationError(validator.errors);
        }
    }
}