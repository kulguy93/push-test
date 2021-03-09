import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as admin from "firebase-admin";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { HttpExceptionFilter } from "./http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const configService: ConfigService = app.get("ConfigService");
  admin.initializeApp({
    credential: admin.credential.cert(configService.get<string>("FIREBASE_CREDENTIALS_PATH"))
  });
  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Push test")
    .setDescription("Push test service API description")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(configService.get<string>("PORT"), 10));
}
bootstrap();
