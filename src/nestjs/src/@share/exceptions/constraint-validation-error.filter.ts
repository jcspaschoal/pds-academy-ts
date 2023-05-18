import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ConstraintValidationError } from '@pds/academy-core/@seedwork/domain';
import { Response } from 'express';

@Catch(ConstraintValidationError)
export class ConstraintValidationErrorFilter implements ExceptionFilter {
  catch(exception: ConstraintValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(400).json({
      statusCode: 400,
      message: exception.message,
    });
  }
}
