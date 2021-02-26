import { Body, Controller, Post } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageDto } from "./dto/message-dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {
  }
  @Post()
  async sendMessage (@Body() messageData: MessageDto) {
    await this.messageService.sendMessage(messageData.deviceTokenIds, messageData.payload);
  }
}
