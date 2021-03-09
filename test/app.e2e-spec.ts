import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import * as admin from "firebase-admin";
import { HttpExceptionFilter } from "../src/http-exception.filter";

describe("Push test (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    admin.initializeApp({
      credential: admin.credential.cert(process.env.FIREBASE_CREDENTIALS_PATH)
    });
    await app.init();
  });
  // TODO: to try the messaging function you should paste your token to someToken variable
  const someToken = "dwYKUaV9PDCDaVcRX-diRZ:APA91bFdotA0cZ2Ar3UUTl5KyzRw4X53BJ4kO0UEQiYnuD20U6cg55_mQDf8XJ8j1leWYXmT5oCXZynu-cjRMkagpIBL54B-DSBxUbGHsz2ipTbzhTnzOADMaYyP1NcrS1sjxh1mHfl2";
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
      .send({ "token": someToken })
      .expect(201)
      .then((res) => {
        date = res.body.createdAt;
        id = res.body.id;
      });
  });
  it("POST /device-token - not have required properties", () => {
    return request(app.getHttpServer())
      .post("/device-token")
      .send({ "foo": "bar" })
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .expect(400);
  });
  it("POST /device-token - try to create non-unique token", () => {
    return request(app.getHttpServer())
      .post("/device-token")
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .send({ "token": someToken })
      .expect(400)
  });
  it("GET /device-token", () => {
    return request(app.getHttpServer())
      .get("/device-token")
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .expect(200, {
        data: [{ id: id, token: someToken, createdAt: date }],
        totalCount: 1
      });
  });
  it("GET /device-token/:id", () => {
    return request(app.getHttpServer())
      .get(`/device-token/${id}`)
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .expect(200, { id: id, token: someToken, createdAt: date });
  });
  it("POST /message", () => {
    return request(app.getHttpServer())
      .post("/message")
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .send({
        "deviceTokenIds": [
          id
        ],
        "payload": {
          "notification": {
            "title": "asdf1",
            "body": "asdf111",
            "tag": "campaign_collapse_key_4318776013712926147"
          }
        }
      })
      .expect(201)
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
  });
  it("DELETE /device-token/:id", () => {
    return request(app.getHttpServer())
      .delete(`/device-token/${id}`)
      .set("Authorization", `Bearer ${process.env.API_KEY}`)
      .expect(200);
  });
});
