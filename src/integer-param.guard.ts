import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class IntegerParamGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    return !!params && !!params.id && /^\d+$/.test(params.id);
  }
}
