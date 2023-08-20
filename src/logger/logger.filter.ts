import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from './logger.service';

@Catch()
export class LoggerFilter implements ExceptionFilter {
  private readonly logger = new LoggerService('LoggerFilter');

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (httpStatus < 500) {
      this.logger.warn(
        `Status ${httpStatus} on access to ${httpAdapter.getRequestUrl(
          ctx.getRequest(),
        )}`,
      );
    } else {
      this.logger.error(
        `Status ${httpStatus} on access to ${httpAdapter.getRequestUrl(
          ctx.getRequest(),
        )}`,
      );
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
