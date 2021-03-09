import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = Object.assign(exception.getResponse(), {
      path: `${request.method} ${request.path}`
    });
    this.logger.error(Object.assign({}, exceptionResponse, { stack: exception.stack }));
    response
      .status(status)
      .json(exceptionResponse);
  }
}
