import {ValueObject, ValueObjectValidationError} from "#seedwork/domain";
import {VideoValidatorFactory} from "../validators";


export type VideoProps = {
    url: string
}


export class Video extends ValueObject<VideoProps> {

    constructor(value: VideoProps) {
        super(value);
        this.validate(value)
    }

    private validate(props: VideoProps) {
        const validator = VideoValidatorFactory.create()
        const isValid = validator.validate(props)
        if (!isValid) {
            throw new ValueObjectValidationError(validator.errors);
        }
    }

}