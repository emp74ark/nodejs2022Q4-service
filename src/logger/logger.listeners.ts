import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerListeners {
  private readonly logger = new LoggerService('Eevents');

  @OnEvent('uncaughtException')
  handleUncaughtException(event: unknown) {
    this.logger.log(event);
  }

  @OnEvent('unhandledRejection')
  handleUnhandledRejection(event: unknown) {
    this.logger.log(event);
  }
}
