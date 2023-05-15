import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ScoreInsufficientException } from '@pds/academy-core/course/domain';

@Catch(ScoreInsufficientException)
export class ScoreInsufficientExceptionFilter implements ExceptionFilter {
  catch(exception: ScoreInsufficientException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(422).json({
      statusCode: 422,
      error: 'Score Insufficient',
    });
  }
}
