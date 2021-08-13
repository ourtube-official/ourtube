import mongoose from "mongoose";
import app from "../../src";

describe("Video Routes", () => {
    test("Uploads a video", async () => {
        const res = await app.inject({
            method: "POST",
            url: "/api/upload"
        });

        expect(res.statusCode).toBe(200);
    });
});

beforeAll(() => {
    process.env.NODE_ENV = "test";
});

afterAll(async () => {
    // mongoose.connection.db.dropCollection("videos", async (err) => {
    //     if (err) console.error(err);

    // });

    await mongoose.disconnect();
    await app.close();
});
