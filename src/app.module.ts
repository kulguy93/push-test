import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeviceTokenModule } from './device-token/device-token.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageModule } from './message/message.module';
import { DeviceToken } from "./device-token/entities/device-token.entity";

@Module({
  imports: [DeviceTokenModule, TypeOrmModule.forRoot({
    type: "postgres",
    url: process.env.DB_URL,
    schema: "push_test",
    synchronize: !(process.env.NODE_ENV === "production"),
    autoLoadEntities: true
  }), MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
