import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ScoreInsufficientException } from '@pds/academy-core/course/domain';
import { ConditionalError } from '@pds/academy-core/@seedwork/domain';

@Catch(ConditionalError)
export class ConditionalErrorExceptionFilter implements ExceptionFilter {
  catch(exception: ConditionalError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(422).json({
      statusCode: 422,
      error: exception.message,
    });
  }
}
