export class ConstraintValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConstraintValidationError";
  }
}

export default ConstraintValidationError;
