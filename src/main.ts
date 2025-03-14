import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Enable CORS
  app.enableCors({
    origin: ['*', 'https://hoechy-app-api.onrender.com'], // Allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Allow cookies or authentication headers
  });

  // Swagger configuration with Bearer Authentication globally
  const config = new DocumentBuilder()
    .setTitle('Hoechy API Documentation')
    .setDescription('API endpoints for Hoechy App')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token', // 👈 Defines "default" security scheme name
    )
    .addSecurityRequirements('access-token') // 👈 Applies Bearer Auth globally
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
