import { IsArray, IsNotEmpty, IsNotEmptyObject } from "class-validator";
import { messaging } from "firebase-admin/lib/messaging";
import MessagingPayload = messaging.MessagingPayload;

export class MessageDto {
  @IsArray()
  @IsNotEmpty()
  deviceTokenIds: number[];

  @IsNotEmptyObject()
  payload: MessagingPayload
}