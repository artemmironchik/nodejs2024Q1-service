import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as yaml from 'yaml';
import { AppModule } from './app.module';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const file = await fs.readFile(
    path.join(__dirname, '../doc/api.yaml'),
    'utf8',
  );
  const swaggerDocument = yaml.parse(file);

  SwaggerModule.setup('api', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);

  console.log(`Application is running on ${port} port`);
}

bootstrap();
