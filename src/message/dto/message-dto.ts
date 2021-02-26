import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNotEmptyObject } from "class-validator";
import { messaging } from "firebase-admin/lib/messaging";
import MessagingPayload = messaging.MessagingPayload;

export class MessageDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  deviceTokenIds: number[];

  @IsNotEmptyObject()
  @IsNotEmpty()
  @ApiProperty({
    type: "object",
    properties: {
      data: { type: "object" },
      payload: {
        type: "object",
        properties: { title: { type: "string" }, body: { type: "string" }, tag: { type: "string" } }
      }
    }
  })
  payload: MessagingPayload
}