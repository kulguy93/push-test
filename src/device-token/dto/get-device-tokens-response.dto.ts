import { ApiProperty } from "@nestjs/swagger";
import { DeviceToken } from "../entities/device-token.entity";

export class GetDeviceTokensResponseDto {
  @ApiProperty()
  data: DeviceToken[];
  @ApiProperty()
  totalCount: number;

  constructor(data, count) {
    this.data = data;
    this.totalCount = count;
  }
}
