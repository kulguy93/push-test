import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceToken } from "../device-token/entities/device-token.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DeviceToken])],
  providers: [MessageService],
  controllers: [MessageController]
})
export class MessageModule {}
