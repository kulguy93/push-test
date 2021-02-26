import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DeviceTokenService } from './device-token.service';
import { CreateDeviceTokenDto } from './dto/create-device-token.dto';

@Controller('device-token')
export class DeviceTokenController {
  constructor(private readonly deviceTokenService: DeviceTokenService) {}

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
