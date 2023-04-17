import ConstraintValidationError from "../../../@seedwork/domain/errors/constraint-error";

export class EmailAlreadyInUseError extends ConstraintValidationError {
  constructor(message?: string) {
    super(message || "Email already in use");
    this.name = "EmailAlreadyInUseError";
  }
}

export default EmailAlreadyInUseError;
