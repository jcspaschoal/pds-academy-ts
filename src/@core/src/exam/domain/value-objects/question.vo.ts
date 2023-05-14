import {ValueObject, ValueObjectValidationError} from "#seedwork/domain";
import {QuestionValidatorFactory} from "#exam/domain";

export type QuestionProps = {
    questionNumber: number;
    description: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    rightAnswer: string;
}


export class Question extends ValueObject<QuestionProps> {

    constructor(value: QuestionProps) {
        super(value);
        this.validate(value);
    }

    private validate(props: QuestionProps) {
        const validator = QuestionValidatorFactory.create()
        const isValid = validator.validate(props)
        if (!isValid) {
            throw new ValueObjectValidationError(validator.errors);
        }
    }
}