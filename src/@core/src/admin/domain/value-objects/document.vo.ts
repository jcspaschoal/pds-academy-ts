import {EntityValidationError, ValueObject} from "#seedwork/domain";
import {DocumentValidatorFactory} from "#admin/domain";

export type DocumentProps  = {
    pathToDocument: string;
}


export class Document extends ValueObject<DocumentProps> {
    constructor(value: DocumentProps) {
        super(value);
        this.validate(value)
    }

    private validate(props: DocumentProps) {
        const validator = DocumentValidatorFactory.create()
        const isValid = validator.validate(props)
        if (!isValid) {
            throw new EntityValidationError(validator.errors);
        }
    }

}