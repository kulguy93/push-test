import { IsNotEmpty } from 'class-validator';
export class CreateDeviceTokenDto {
  @IsNotEmpty()
  token: string
}
