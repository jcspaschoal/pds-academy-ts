import {FieldsErrors} from "#seedwork/domain";

export class ValidationError extends Error {
}

export class EntityValidationError extends Error {
    constructor(public error: FieldsErrors) {
        super("Entity Validation Error");
        this.name = "EntityValidationError";
    }
}

export class ValueObjectValidationError extends Error {
    constructor(public error: FieldsErrors) {
        super("Value Object Validation Error");
        this.name = "ValueObjectValidationError";
    }
}

