import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CreateDeviceTokenDto } from "./dto/create-device-token.dto";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DeviceToken } from "./entities/device-token.entity";
import { GetDeviceTokensQueryDto } from "./dto/get-device-tokens-query.dto";

@Injectable()
export class DeviceTokenService {
  constructor(@InjectRepository(DeviceToken) private deviceTokenRepository: Repository<DeviceToken>) {
  }

  private readonly logger = new Logger(DeviceTokenService.name);

  async create(createDeviceTokenDto: CreateDeviceTokenDto): Promise<DeviceToken> {
    const deviceToken = new DeviceToken();
    deviceToken.token = createDeviceTokenDto.token;
    if (createDeviceTokenDto.createdAt) {
      deviceToken.createdAt = createDeviceTokenDto.createdAt;
    }
    const existingDeviceToken = await this.deviceTokenRepository.findOne({
      where: [{
        token: deviceToken.token
      }]
    });
    if (existingDeviceToken) {
      throw new HttpException({ message: `Device token ${deviceToken.token} is already registered` }, HttpStatus.BAD_REQUEST);
    }
    return this.deviceTokenRepository.save(deviceToken);
  }

  findAll(query: GetDeviceTokensQueryDto): Promise<[DeviceToken[], number]> {
    let limit = query.limit;
    if (limit > 1000) {
      limit = 1000;
    }
    let tokensArray;
    if (query.tokens) {
      tokensArray = query.tokens.split(",");
    }
    return this.deviceTokenRepository.findAndCount({
      skip: query.offset,
      take: limit,
      where: tokensArray ? [{
        token: In(tokensArray)
      }] : []
    });
  }

  findOne(id: number): Promise<DeviceToken> {
    const logger = this.logger;
    return this.deviceTokenRepository.findOneOrFail(id).catch((e) => {
      logger.error(e.stack);
      throw new HttpException({ message: `Failed to find device token by id ${id}` }, HttpStatus.NOT_FOUND);
    });
  }

  async remove(id: number): Promise<void> {
    const logger = this.logger;
    const relatedDeviceToken = await this.deviceTokenRepository.findOneOrFail(id).catch((e) => {
      logger.error(e.stack);
      throw new HttpException({ message: `Failed to remove device token by id ${id}` }, HttpStatus.NOT_FOUND);
    });
    await this.deviceTokenRepository.remove(relatedDeviceToken);
  }
}
