import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import * as admin from "firebase-admin";
import { InjectRepository } from "@nestjs/typeorm";
import { DeviceToken } from "../device-token/entities/device-token.entity";
import { Repository } from "typeorm";
import { messaging } from "firebase-admin/lib/messaging";
import MessagingPayload = messaging.MessagingPayload;

@Injectable()
export class MessageService {
  constructor(@InjectRepository(DeviceToken) private deviceTokenRepository: Repository<DeviceToken>) {
  }

  private readonly logger = new Logger(MessageService.name);
  async sendMessage(deviceTokenIds: number[], payload: MessagingPayload): Promise<void> {
    const logger = this.logger;
    if (!deviceTokenIds[0]) {
      throw new HttpException({ message: "No device token ids provided" }, HttpStatus.BAD_REQUEST);
    }
    const deviceTokens = await this.deviceTokenRepository.findByIds(deviceTokenIds);
    if (!deviceTokens[0]) {
      throw new HttpException({ message: "No device tokens found" }, HttpStatus.BAD_REQUEST);
    }
    const tokensArray = deviceTokens.map((each) => {
      return each.token;
    });
    await admin.messaging().sendToDevice(tokensArray, payload).catch((err) => {
      logger.error(err.stack);
      throw new HttpException({ message: "Failed to send message" }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
