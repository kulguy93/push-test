import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateDeviceTokenDto {
  @IsNotEmpty()
  @ApiProperty()
  token: string;

  @ApiPropertyOptional({
    format: "date"
  })
  createdAt?: Date;
}
