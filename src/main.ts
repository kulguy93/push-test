import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
  admin.initializeApp({
    credential: admin.credential.cert('/Users/arturgilmanov/WebstormProjects/picksell-test/push-test/push-test-37865-firebase-adminsdk-g56m2-072dca42b4.json')
  })
}
bootstrap();
