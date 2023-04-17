import { ClassValidatorFields } from "../validators/class-validator-fields";
import { FieldsErrors } from "../validators/validator-fields-interface";
import { EntityValidationError } from "../errors/validation-error";
import objectContaining from "expect";

type Expected =
  | { validator: ClassValidatorFields<any>; data: any }
  | (() => any);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === "function") {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrorsMessages(error.error, received);
      }
    } else {
      const { validator, data } = expected;
      const validated = validator.validate(data);

      if (validated) {
        return isValid();
      }

      return assertContainsErrorsMessages(validator.errors, received);
    }
  },
});

function isValid() {
  return { pass: true, message: () => "" };
}

function assertContainsErrorsMessages(
  expected: FieldsErrors,
  received: FieldsErrors
) {
  const receivedKeys = Object.keys(received);
  const expectedKeys = Object.keys(expected);
  const missingKeys = expectedKeys.filter((key) => !receivedKeys.includes(key));

  if (missingKeys.length > 0) {
    const message = () =>
      `The validation errors do not contain the following keys: ${JSON.stringify(
        missingKeys
      )}.`;
    return { pass: false, message };
  }

  const failedMatches = expectedKeys.filter(
    (key) => !this.equals(received[key], expected[key])
  );

  if (failedMatches.length > 0) {
    const message = () =>
      `The validation errors do not match the expected values: ${JSON.stringify(
        failedMatches
      )}.`;
    return { pass: false, message };
  }

  return { pass: true, message: () => "" };
}
