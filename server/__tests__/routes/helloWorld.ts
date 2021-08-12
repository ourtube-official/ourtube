import mongoose from "mongoose";

import app from "../../src/index";

beforeAll(() => {
    process.env.NODE_ENV = "test";
});

describe("Hello World Route", () => {
    // prettier-ignore
    it("should return \"Hello World!\"", async () => {
        const res = await app.inject({ method: "GET", url: "/" });

        expect(res.statusCode).toBe(200);
        expect(res.json().msg).toBe("Hello World!");
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await app.close();
});
