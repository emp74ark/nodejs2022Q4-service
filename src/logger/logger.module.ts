import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerListeners } from './logger.listeners';

@Global()
@Module({
  providers: [LoggerService, LoggerListeners],
  exports: [LoggerService, LoggerListeners],
})
export class LoggerModule {}
