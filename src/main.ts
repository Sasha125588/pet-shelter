import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './shared/utils/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
