/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, Diet, conn } = require("../../src/db.js");

const agent = session(app);

describe("Recipe routes", () => {
  beforeAll(async () => {
    try {
      await conn.authenticate();
    } catch (err) {
      console.error("Unable to connect to the database:", err);
    }
  });

  beforeEach(async () => {
    await Recipe.sync({ force: true });
    await Diet.sync({ force: true });
  });

  describe("POST /recipes", () => {
    it("should work when all fields are provided", async () => {
      const response = await agent.post("/recipes").send({
        title: "Test Recipe",
        image: "https://example.com/image.jpg",
        summary: "This is a test recipe",
        healthScore: 50,
        steps: ["Step 1", "Step 2"],
        diets: [1, 2],
      });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Test Recipe");
    });

    it("should throw an error if no fields are provided", async () => {
      const response = await agent.post("/recipes").send({});

      expect(response.status).toBe(400);
    });
  });
});
