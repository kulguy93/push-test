import { Injectable } from '@nestjs/common';
import { CreateDeviceTokenDto } from './dto/create-device-token.dto';
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DeviceToken } from "./entities/device-token.entity";

@Injectable()
export class DeviceTokenService {
  constructor(@InjectRepository(DeviceToken) private deviceTokenRepository: Repository<DeviceToken>) {
  }

  async create(createDeviceTokenDto: CreateDeviceTokenDto): Promise<DeviceToken> {
    const deviceToken = new DeviceToken();
    deviceToken.token = createDeviceTokenDto.token;
    return this.deviceTokenRepository.save(deviceToken);
  }

  findAll(limit: number = 1000, offset: number = 0, tokensArray?: string[]): Promise<[DeviceToken[], number]> {
    if (limit > 1000) {
      limit = 1000;
    }
    return this.deviceTokenRepository.findAndCount({
      skip: offset,
      take: limit,
      where: tokensArray && tokensArray[0] ? [{
        token: In(tokensArray)
      }] : []
    });
  }

  findOne(id: number): Promise<DeviceToken> {
    return  this.deviceTokenRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.deviceTokenRepository.delete(id);
  }
}
