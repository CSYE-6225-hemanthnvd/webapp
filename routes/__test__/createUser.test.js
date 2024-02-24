const supertest = require("supertest");
const app = require("../../app");

describe("Create user post request", ()=>{
  it("Returns 400 if authorization is found",async ()=>{
    await supertest(app).post("/v1/user").auth('username','password').send({
      "first_name": "Pane",
      "last_name": "Doe",
      "password": "skdjfhskdfjhg",
      "username": "jane.doe@example.com"
    }).expect(400)
  }),
  it("Create account and get account", async ()=>{
    await supertest(app).post("/v1/user").send({
      "first_name": "Jane",
      "last_name": "White",
      "password": "skdjfhskdfjhg",
      "username": "jane.doe@example.com"
    }).expect(200).then((res)=>{
      expect(res.body.first_name).toBe("Jane");
      expect(res.body.last_name).toBe("Doe");
      expect(res.body.username).toBe("jane.doe@example.com");
    })
    await supertest(app).get("/v1/user/self").auth('jane.doe@example.com','skdjfhskdfjhg').expect(200)
  }),
  it("Update account and verify", async ()=>{
    await supertest(app).put("/v1/user/self").auth('jane.doe@example.com','skdjfhskdfjhg').send({
      "first_name": "Walter",
      "last_name": "White"
    }).expect(200)
    await supertest(app).get("/v1/user/self").auth('jane.doe@example.com','skdjfhskdfjhg').expect(200).then((res)=>{
      expect(res.body.first_name).toBe("Walter");
      expect(res.body.last_name).toBe("White");
    })
  });
});
