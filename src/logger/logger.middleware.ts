import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new LoggerService('NET');

  use(req: Request, res: Response, next: NextFunction) {
    const {
      method,
      url,
      query,
      body,
      socket: { remoteAddress },
    } = req;
    const { statusCode } = res;
    this.logger.net('Request', method, url, query, body, remoteAddress);
    res.on('finish', () => {
      this.logger.net(
        'Response',
        method,
        url,
        query,
        body,
        remoteAddress,
        statusCode,
      );
    });
    next();
  }
}
