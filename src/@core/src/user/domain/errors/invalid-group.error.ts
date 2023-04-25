import ConstraintValidationError from "../../../@seedwork/domain/errors/constraint-error";
import {Error} from "sequelize";

export class InvalidGroupError extends Error {
    constructor(invalidType: any) {
        super(`Invalid group type type: ${invalidType}`);
        this.name = "InvalidGroupTypeError";
    }
}

export default InvalidGroupError;
