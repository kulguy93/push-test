import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import * as crypto from "crypto";

describe("Push test (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const randomToken = crypto.randomBytes(12).toString("hex");
  let date;
  let id;

  it("GET /version", () => {
    return request(app.getHttpServer())
      .get("/version")
      .expect(200);
  });
  it("POST /device-token - unauthorized request", () => {
    return request(app.getHttpServer())
      .post("/device-token")
      .expect(403);
  });
  it("POST /device-token - successful response", () => {
    return request(app.getHttpServer())
      .post("/device-token")
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .send({ "token": randomToken })
      .expect(201)
      .then((res) => {
        date = res.body.createdAt;
        id = res.body.id;
      });
  });
  it("POST /device-token - not have required properties", () => {
    return request(app.getHttpServer())
      .post("/device-token")
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .expect(400);
  });
  it("POST /device-token - try to create non-unique token", () => {
    return request(app.getHttpServer())
      .post("/device-token")
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .send({ "token": randomToken })
      .expect(400);
  });
  it("GET /device-token", () => {
    return request(app.getHttpServer())
      .get("/device-token")
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .expect(200, [
        [{ id: id, token: randomToken, createdAt: date }],
        1
      ]);
  });
  it("GET /device-token/:id", () => {
    return request(app.getHttpServer())
      .get(`/device-token/${id}`)
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .expect(200, { id: id, token: randomToken, createdAt: date });
  });
  it("POST /message", () => {
    return request(app.getHttpServer())
      .post("/message")
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .send({
        "deviceTokenIds": [
          1
        ],
        "payload": {
          "notification": {
            "title": "asdf1",
            "body": "asdf111",
            "tag": "campaign_collapse_key_4318776013712926147"
          }
        }
      })
      .expect(201);
  });
  it("POST /message - invalid input data", () => {
    return request(app.getHttpServer())
      .post("/message")
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .send({
        "deviceTokenIds": [
          id
        ],
        "foo": "bar"
      })
      .expect(400);
  });
  it("DELETE /device-token/:id", () => {
    return request(app.getHttpServer())
      .delete(`/device-token/${id}`)
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .expect(200);
  });
});
