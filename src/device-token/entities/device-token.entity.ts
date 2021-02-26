import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique('device_token_token_unique', ['token'])
export class DeviceToken {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  token: string;
  @Column()
  createdAt: Date = new Date();
}
