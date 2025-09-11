import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS と API プレフィックス
  app.enableCors({ origin: true, credentials: true });
  app.setGlobalPrefix('v1');

  // body サイズ制限
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true }));

  // Swagger (OpenAPI)
  const config = new DocumentBuilder()
    .setTitle('Puyo Backend API')
    .setDescription('Puyo field analysis API')
    .setVersion('1.0.0')
    .addServer('/')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, document, {
    jsonDocumentUrl: 'v1/openapi.json',
  });

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3001);
}
bootstrap();
