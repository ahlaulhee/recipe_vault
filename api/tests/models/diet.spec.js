const { Diet, conn } = require("../../src/db.js");

describe("Diet model", () => {
  beforeAll(async () => {
    try {
      await conn.authenticate();
    } catch (err) {
      console.error("Unable to connect to the database:", err);
    }
  });

  describe("Validators", () => {
    beforeEach(async () => {
      await Diet.sync({ force: true });
    });

    it("should throw an error if no fields are provided", async () => {
      await expect(Diet.create({})).rejects.toThrow();
    });

    it("should work when all fields are provided", async () => {
      await expect(Diet.create({ name: "Test Diet" })).resolves.toBeTruthy();
    });
  });
});
