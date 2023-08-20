import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HOST, LOG_LEVEL, PORT } from "./entities";
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './logger/logger.service';
import { LoggerFilter } from './logger/logger.filter';

type LogLevelType = 'log' | 'error' | 'warn' | 'debug';

const logLevels = LOG_LEVEL.split(',') as LogLevelType[];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: logLevels,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useLogger(app.get(LoggerService));

  const adapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new LoggerFilter(adapter));

  await app.listen(PORT, HOST);
}

bootstrap();
