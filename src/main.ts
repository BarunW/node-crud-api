import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { createDocument } from './swagger/swagger';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* to use validation pipes everywhere, we need to enable the global pipes  // Configure global DTO validation pipe*/
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  SwaggerModule.setup('swag-api', app, createDocument(app));

  await app.listen(3000);
} 
bootstrap();