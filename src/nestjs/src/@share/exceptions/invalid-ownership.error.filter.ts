import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { InvalidOwnershipError } from '@pds/academy-core/course/domain';

@Catch(InvalidOwnershipError)
export class InvalidOwnershipErrorFilter implements ExceptionFilter {
  catch(exception: InvalidOwnershipError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(422).json({
      statusCode: 422,
      error: 'Invalid ownership',
    });
  }
}
