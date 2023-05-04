import {IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";
import ClassValidatorFields from "#seedwork/domain/validators/class-validator-fields";
import {DocumentProps} from "#inscription/domain/value-objects";

export class DocumentRules {

    @MaxLength(500)
    @MinLength(40)
    @IsString()
    @IsNotEmpty()
    pathToDocument: string;

    constructor(pathToDocument: DocumentProps) {
        Object.assign(this, {pathToDocument});
    }
}


export class DocumentValidator extends ClassValidatorFields<DocumentRules> {
    validate(data: any): boolean {
        return super.validate(new DocumentRules(data ?? ({} as any)));
    }
}


export class DocumentValidatorFactory {
    static create() {
        return new DocumentValidator();
    }
}

