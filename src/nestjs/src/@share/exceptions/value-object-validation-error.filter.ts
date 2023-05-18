import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValueObjectValidationError } from '@pds/academy-core/@seedwork/domain';
import { union } from 'lodash';
import { Response } from 'express';

@Catch(ValueObjectValidationError)
export class ValueObjectValidationErrorFilter implements ExceptionFilter {
  catch(exception: ValueObjectValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(422).json({
      statusCode: 422,
      error: 'Unprocessable Entity',
      message: union(...Object.values(exception.error)),
    });
  }
}
