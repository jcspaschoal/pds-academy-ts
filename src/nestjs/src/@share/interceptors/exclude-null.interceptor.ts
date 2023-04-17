import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data === null || data === undefined) {
          return data;
        }
        if (Array.isArray(data)) {
          return data
            .filter((item) => item !== null && item !== undefined)
            .map((item) => instanceToPlain(item));
        }
        return instanceToPlain(data);
      }),
    );
  }
}
