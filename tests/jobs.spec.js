const supertest = require("supertest");

const app = require("../src/app");

const request = supertest(app);

describe("Jobs testing", () => {
  it("Should return all unpaid jobs for a user", async () => {
    const res = await request
      .get("/jobs/unpaid")
      .set({ profile_id: 1, Accept: "application/json" });

    expect(res.statusCode).toEqual(200);
  });

  it("Should pay for a job", async () => {
    const res = await request
      .post("/jobs/1/pay")
      .set({ profile_id: 1, Accept: "application/json" });

    expect(res.statusCode).toEqual(200);
  });
});
