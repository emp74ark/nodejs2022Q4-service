import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { Color, colorizedLevel } from './logger.colors';

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

  log(message: any, context?: string) {
    super.log(message, context);
    // todo: write file
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
    // todo: write file
  }

  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
    // todo: write file
  }

  net(
    type: 'Request' | 'Response',
    method: string,
    url: string,
    query: unknown,
    body: Record<string, any>,
    remoteAddress: string,
    statusCode?: number,
  ) {
    // todo: write to file
    console.log(
      colorizedLevel.net,
      this.getTimestamp(),
      `${Color.FgCyan}[NET]${Color.Reset}\t`,
      `${type} ::`,
      `method: ${method}`,
      `url: ${url}`,
      `${Object.keys(query).length ? 'query: ' + JSON.stringify(query) : ''}`,
      `${Object.keys(body).length ? 'body: ' + JSON.stringify(body) : ''}`,
      `remote: ${remoteAddress}`,
      `${statusCode ? 'status: ' + statusCode : ''}`,
    );
  }
}
