const supertest = require("supertest");

const app = require("../src/app");

const request = supertest(app);

describe("Contracts testing", () => {
  it("Should return the contract only if it belongs to the profile calling", async () => {
    const res = await request
      .get("/contracts/1")
      .set({ profile_id: 1, Accept: "application/json" });

    expect(res.statusCode).toEqual(200);
  });

  it("Should return a list of contracts belonging to a user", async () => {
    const res = await request
      .get("/contracts")
      .set({ profile_id: 1, Accept: "application/json" });

    expect(res.statusCode).toEqual(200);
  });
});
