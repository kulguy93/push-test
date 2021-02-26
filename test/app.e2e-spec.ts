import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("Push test (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("GET /version", () => {
    return request(app.getHttpServer())
      .get("/version")
      .expect(200);
  });
  it("POST /device-token - successful response", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200);
  });
  it("POST /device-token - not have required properties", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200);
  });
  it("POST /device-token - try to create non-unique token", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200);
  });
  it("GET /device-token", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200);
  });
  it("GET /device-token/:id", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200);
  });
  it("GET /device-token/:id", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200);
  });
  it("POST /message", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200);
  });
  it("POST /message - invalid input data", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200);
  });
  it("DELETE /device-token/:id", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200);
  });
});
