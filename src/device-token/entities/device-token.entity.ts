import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DeviceToken {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true
  })
  token: string;
  @Column()
  createdAt: Date = new Date();
}
