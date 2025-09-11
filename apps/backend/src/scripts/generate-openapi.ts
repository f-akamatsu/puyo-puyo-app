import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { AppModule } from '../app.module';

async function main() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('Puyo Backend API')
    .setDescription('Puyo field analysis API')
    .setVersion('1.0.0')
    .addServer('/')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const outPath = join(process.cwd(), 'openapi.json');
  writeFileSync(outPath, JSON.stringify(document, null, 2), 'utf-8');
  await app.close();
  // eslint-disable-next-line no-console
  console.log(`OpenAPI schema generated: ${outPath}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

