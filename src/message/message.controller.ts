import { Body, Controller, Inject, Post } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageDto } from "./dto/message-dto";

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {
  }
  @Post()
  async sendMessage (@Body() messageData: MessageDto) {
    await this.messageService.sendMessage(messageData.deviceTokenIds, messageData.payload);
  }
}
