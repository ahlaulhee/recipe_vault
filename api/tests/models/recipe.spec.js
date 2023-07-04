const { Recipe, conn } = require("../../src/db.js");

describe("Recipe model", () => {
  beforeAll(async () => {
    try {
      await conn.authenticate();
    } catch (err) {
      console.error("Unable to connect to the database:", err);
    }
  });

  describe("Validators", () => {
    beforeEach(async () => {
      await Recipe.sync({ force: true });
    });

    it("should throw an error if no fields are provided", async () => {
      await expect(Recipe.create({})).rejects.toThrow();
    });

    it("should work when all fields are provided", async () => {
      await expect(
        Recipe.create({
          title: "Test Recipe",
          image: "https://example.com/image.jpg",
          summary: "This is a test recipe",
          healthScore: 50,
          steps: ["Step 1", "Step 2"],
        })
      ).resolves.toBeTruthy();
    });
  });
});
