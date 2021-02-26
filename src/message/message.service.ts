import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { InjectRepository } from "@nestjs/typeorm";
import { DeviceToken } from "../device-token/entities/device-token.entity";
import { Repository } from "typeorm";
import { messaging } from "firebase-admin/lib/messaging";
import MessagingPayload = messaging.MessagingPayload;

@Injectable()
export class MessageService {
  constructor(@InjectRepository(DeviceToken) private deviceTokenRepository: Repository<DeviceToken>) {
  }
  async sendMessage(deviceTokenIds: number[], payload: MessagingPayload): Promise<void> {
    if (!deviceTokenIds[0]) {
      return;
    }
    const deviceTokens = await this.deviceTokenRepository.findByIds(deviceTokenIds);
    if (!deviceTokens[0]) {
      return;
    }
    const tokensArray = deviceTokens.map((each) => {
      return each.token;
    });
    await admin.messaging().sendToDevice(tokensArray, payload);
  }
}
