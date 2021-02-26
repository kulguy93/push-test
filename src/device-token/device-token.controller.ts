import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DeviceTokenService } from "./device-token.service";
import { CreateDeviceTokenDto } from "./dto/create-device-token.dto";
import { AuthGuard } from "../auth.guard";

@ApiTags("device-token")
@ApiBearerAuth()
@Controller("device-token")
@UseGuards(AuthGuard)
export class DeviceTokenController {
  constructor(private readonly deviceTokenService: DeviceTokenService) {
  }

  @Post()
  create(@Body() createDeviceTokenDto: CreateDeviceTokenDto) {
    return this.deviceTokenService.create(createDeviceTokenDto);
  }

  @Get()
  findAll() {
    return this.deviceTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceTokenService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceTokenService.remove(+id);
  }
}
