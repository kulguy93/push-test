import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DeviceTokenModule } from "./device-token/device-token.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageModule } from "./message/message.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { configValidate } from "./config.validate";


@Module({
  imports: [DeviceTokenModule, ConfigModule.forRoot({
    validate: configValidate
  }), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => ({
      type: "postgres",
      url: config.get<string>("DB_URL"),
      schema: "push_test",
      synchronize: config.get<boolean>("isProduction"),
      autoLoadEntities: true
    }),
    inject: [ConfigService]
  }), MessageModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
