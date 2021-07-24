import request from "supertest";
import mongoose from "mongoose";

import app from "../../src/index";

beforeAll(() => {
    process.env.NODE_ENV = "test";
});

describe("Hello World Route", () => {
    // prettier-ignore
    it("should return \"Hello World!\"", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Hello World!");
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    app.close();
});
