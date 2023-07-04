/* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require("chai");
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

  describe("GET /diets", () => {
    it("should return an array of 11 diets", async () => {
      const response = await agent.get("/diets");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(11);
      expect(response.body).toEqual([
        {
          id: 1,
          name: "Gluten Free",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          id: 2,
          name: "Ketogenic",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          id: 3,
          name: "Vegetarian",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          id: 4,
          name: "Lacto-Vegetarian",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          id: 5,
          name: "Ovo-Vegetarian",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          id: 6,
          name: "Vegan",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          id: 7,
          name: "Pescetarian",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          id: 8,
          name: "Paleo",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          id: 9,
          name: "Primal",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          id: 10,
          name: "Low FODMAP",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          id: 11,
          name: "Whole30",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]);
    });
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

      expect(response.status).toBe(201);
      expect(response.body.title).toBe("Test Recipe");
    });

    it("should throw an error if no fields are provided", async () => {
      const response = await agent.post("/recipes").send({});

      expect(response.status).toBe(400);
    });
  });
});
