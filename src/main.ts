import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as fs from 'fs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const images = path.join(__dirname, '/images');

  // console.log(process.env.WEBHOOK_URL);
  if (!fs.existsSync(images)) {
    fs.mkdirSync(images);
  }

  await app.listen(3000);
}
bootstrap();
