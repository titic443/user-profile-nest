import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as fs from 'fs'
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const images = path.join(__dirname, '/images');
  app.use(json({ limit: '300mb' }));
  app.use(urlencoded({ limit: '300mb', extended: true }));
  // console.log(process.env.WEBHOOK_URL);
  if (!fs.existsSync(images)) {
    fs.mkdirSync(images);
  }

  await app.listen(3000);
}
bootstrap();
