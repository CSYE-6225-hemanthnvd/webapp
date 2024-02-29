const supertest = require("supertest");
const app = require("../../app");

describe("healthz", ()=>{
  it("Returns 405 for all except get", async()=>{
    await supertest(app).post("/healthz").expect(405);
    await supertest(app).put("/healthz").expect(405);
    await supertest(app).patch("/healthz").expect(405);
    await supertest(app).delete("/healthz").expect(405);
    await supertest(app).head("/healthz").expect(405);
    await supertest(app).options("/healthz").expect(405);
    await supertest(app).get("/healthz").expect(200);
  }),
  it("Sends 400 if request has any body or query parameters", async()=>{
    await supertest(app).get("/healthz").send({"key":"value"}).expect(400);
    await supertest(app).get("/healthz").query({"key":"value"}).expect(400);
  })
})