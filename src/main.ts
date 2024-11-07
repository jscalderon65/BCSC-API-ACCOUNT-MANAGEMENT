import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ABOUT_PROJECT,
  GLOBAL_PREFIX,
  PORT,
  TIME_ZONE,
} from 'src/common/constants/config-app';
import { MESSAGES } from 'src/common/constants/messages';
import { dtoValidationExceptionFactory } from 'src/common/pipes/dto-validation.pipe';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const options = new DocumentBuilder()
    .setTitle(ABOUT_PROJECT.API_TITLE)
    .setDescription(ABOUT_PROJECT.API_DESCRIPTION)
    .setVersion(ABOUT_PROJECT.SWAGGER_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(ABOUT_PROJECT.SWAGGER_ROUTE, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: dtoValidationExceptionFactory,
    }),
  );

  process.env.TZ = TIME_ZONE;
  await app.listen(PORT);
  logger.log(MESSAGES.APP_RUNNING_STATUS);
}
bootstrap();
