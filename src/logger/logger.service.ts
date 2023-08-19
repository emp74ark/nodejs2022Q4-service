import { ConsoleLogger, Injectable } from '@nestjs/common';
import { logContext, logDate, logLevel } from './logger.components';

@Injectable()
export class LoggerService extends ConsoleLogger {
  log(message: any, context?: string) {
    // super.log(message, context);
    console.log(logLevel.log, logDate, logContext(context), message);
  }

  warn(message: any, context?: string) {
    // super.warn(message, context);
    console.log(logLevel.warn, logDate, logContext(context), message);
  }

  error(message: any, stack?: string, context?: string) {
    // super.error(message, stack, context);
    console.log(logLevel.error, logDate, logContext(context), message);
    console.log('[ERROR STACK]:\n', stack);
  }
}
