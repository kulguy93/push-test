import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageDto } from "./dto/message-dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth.guard";

@ApiTags("message")
@ApiBearerAuth()
@Controller("message")
@UseGuards(AuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {
  }

  @Post()
  async sendMessage(@Body() messageData: MessageDto) {
    await this.messageService.sendMessage(messageData.deviceTokenIds, messageData.payload);
  }
}
