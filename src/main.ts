import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration with Bearer Auth
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API endpoints for Hoechy App')
    .setVersion('1.0')
    .addBearerAuth() // 👈 Enables Bearer Token authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
