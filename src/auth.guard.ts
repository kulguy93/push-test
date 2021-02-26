import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean {
    const request = context.switchToHttp().getRequest();
    return (request.get("Authorization") === "Bearer " + process.env.API_KEY);
  }
}
