import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { DeviceTokenService } from "./device-token.service";
import { CreateDeviceTokenDto } from "./dto/create-device-token.dto";
import { AuthGuard } from "../auth.guard";
import { DeviceToken } from "./entities/device-token.entity";
import { GetDeviceTokensResponseDto } from "./dto/get-device-tokens-response.dto";
import { GetDeviceTokensQueryDto } from "./dto/get-device-tokens-query.dto";
import { IntegerParamGuard } from "../integer-param.guard";

@ApiTags("device-token")
@ApiBearerAuth()
@Controller("device-token")
@UseGuards(AuthGuard)
export class DeviceTokenController {
  constructor(private readonly deviceTokenService: DeviceTokenService) {
  }

  @Post()
  @ApiOkResponse({ type: DeviceToken })
  create(@Body() createDeviceTokenDto: CreateDeviceTokenDto): Promise<DeviceToken> {
    return this.deviceTokenService.create(createDeviceTokenDto);
  }

  @Get()
  @ApiOkResponse({ type: GetDeviceTokensResponseDto })
  async findAll(@Query() query: GetDeviceTokensQueryDto): Promise<GetDeviceTokensResponseDto> {
    const data = await this.deviceTokenService.findAll(query);
    return new GetDeviceTokensResponseDto(data[0], data[1]);
  }

  @UseGuards(IntegerParamGuard)
  @Get(":id")
  @ApiOkResponse({ type: DeviceToken })
  findOne(@Param("id") id: number) {
    return this.deviceTokenService.findOne(+id);
  }

  @UseGuards(IntegerParamGuard)
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.deviceTokenService.remove(+id);
  }
}
