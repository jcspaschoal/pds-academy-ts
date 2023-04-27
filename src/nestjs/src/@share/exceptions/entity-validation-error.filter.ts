import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityValidationError } from '@pds/academy-core/@seedwork/domain';
import { Response } from 'express';
import { union } from 'lodash';

@Catch(EntityValidationError)
export class EntityValidationErrorFilter implements ExceptionFilter {
  catch(exception: EntityValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(422).json({
      statusCode: 422,
      error: 'Unprocessable Entity',
      message: union(...Object.values(exception.error)),
    });
  }
}
