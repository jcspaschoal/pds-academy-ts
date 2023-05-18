import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { NotFoundError } from '@pds/academy-core/@seedwork/domain';
import { Response } from 'express';

@Catch(NotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(404).json({
      statusCode: 404,
      error: 'Not Found',
      message: exception.message,
    });
  }
}
