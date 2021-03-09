import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {
  }

  canActivate(
    context: ExecutionContext
  ): boolean {
    const request = context.switchToHttp().getRequest();
    return (request.get("Authorization") === "Bearer " + this.configService.get<string>("API_KEY"));
  }
}
