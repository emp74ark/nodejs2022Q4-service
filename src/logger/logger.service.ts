import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { colorizedLevel } from './logger.colors';

@Injectable()
export class LoggerService extends ConsoleLogger {
  protected formatPid(pid: number) {
    return `${pid}`;
  }

  protected stringifyMessage(message: unknown, logLevel: LogLevel) {
    return `${message}`;
  }

  protected formatMessage(
    logLevel: LogLevel,
    message: unknown,
    pidMessage: string,
    formattedLogLevel: string,
    contextMessage: string,
    timestampDiff: string,
  ): string {
    const level = colorizedLevel[logLevel] ?? `[${logLevel.toUpperCase()}]\t`;
    return `${level}${this.getTimestamp()}\t${contextMessage}\t${message}\n`;
  }
}
