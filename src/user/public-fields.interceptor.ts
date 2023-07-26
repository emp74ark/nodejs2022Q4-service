import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from '../entities';

@Injectable()
export class PublicFieldsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const publicFields = (user: User) => {
      const { password, ...rest } = user;
      return rest;
    };

    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user) => publicFields(user));
        }
        return publicFields(data);
      }),
    );
  }
}
