import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { InvalidRoleError } from '@pds/academy-core/course/domain';

@Catch(InvalidRoleError)
export class InvalidRoleErrorFilter implements ExceptionFilter {
  catch(exception: InvalidRoleError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(422).json({
      statusCode: 422,
      error: 'Invalid Role',
    });
  }
}
