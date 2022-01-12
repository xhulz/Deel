const supertest = require("supertest");

const app = require("../src/app");

const request = supertest(app);

describe("Profile testing", () => {
  it("Should return all unpaid jobs for a user", async () => {
    const res = await request
      .get("/admin/best-profession")
      .set({ profile_id: 1, Accept: "application/json" })
      .query({
        start: "2022-01-09",
        end: "2022-01-11",
      });

    expect(res.statusCode).toEqual(200);
  });

  it("Should return the clients the paid the most for jobs in the query time period", async () => {
    const res = await request
      .get("/admin/best-clients")
      .set({ profile_id: 1, Accept: "application/json" })
      .query({
        start: "2022-01-09",
        end: "2022-01-11",
        limit: 1,
      });

    expect(res.statusCode).toEqual(200);
  });

  it("Should deposit money into the the the balance of a client", async () => {
    const res = await request
      .post("/balances/deposit/1")
      .set({ profile_id: 1, Accept: "application/json" })
      .send({
        deposit: 10,
      });

    expect(res.statusCode).toEqual(200);
  });
});
