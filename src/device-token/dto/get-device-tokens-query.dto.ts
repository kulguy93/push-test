import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetDeviceTokensQueryDto {
  @ApiPropertyOptional({ description: "default 1000, max 1000" })
  limit: number = 1000;
  @ApiPropertyOptional({ description: "default 0" })
  offset: number = 0;
  @ApiPropertyOptional({ description: "comma separated list of device tokens" })
  tokens?: string;
}
