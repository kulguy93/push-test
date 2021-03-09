import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
@Unique('device_token_token_unique', ['token'])
export class DeviceToken {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  token: string;
  @ApiProperty()
  @Column()
  createdAt: Date = new Date();
}
