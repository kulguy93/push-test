import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("root")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get("/version")
  @ApiOkResponse({ schema: { properties: { version: { type: "string" } } } })
  getVersion(): object {
    return this.appService.getVersion();
  }
}
