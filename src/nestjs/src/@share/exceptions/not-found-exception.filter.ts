import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { NotFoundError } from '@pds/academy-core/src/@seedwork/domain';
import { Response } from 'express';
import { union } from 'lodash';

@Catch(NotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(422).json({
            statusCode: 404,
            error: 'NotFoundError',
            message: exception.message,
        });
    }
}
