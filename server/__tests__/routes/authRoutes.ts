import mongoose from "mongoose";
import app from "../../src";

describe("Auth Routes", () => {
    it("should successfully register a new user", async () => {
        const res = await app.inject({
            method: "POST",
            url: "/api/register",
            payload: {
                username: "testing",
                email: "testing@gmail.com",
                password: "testing001",
                confirmPassword: "testing001"
            }
        });

        expect(res.statusCode).toBe(200);
    });

    it("should error because the email is already in use", async () => {
        const res = await app.inject({
            method: "POST",
            url: "/api/register",
            payload: {
                username: "testing",
                email: "testing@gmail.com",
                password: "testing001",
                confirmPassword: "testing001"
            }
        });

        expect(res.statusCode).toBe(400);
        expect(res.json()).toEqual({ email: "Email already in use" });
    });

    it("should error because of invalid values", async () => {
        let res = await app.inject({
            method: "POST",
            url: "/api/register",
            payload: {
                username: "a",
                email: "a",
                password: "a",
                confirmPassword: "a"
            }
        });

        expect(res.statusCode).toBe(400);

        // Values must exist
        res = await app.inject({
            method: "POST",
            url: "/api/register",
            payload: {
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
        });

        expect(res.statusCode).toBe(400);

        // Username too long
        res = await app.inject({
            method: "POST",
            url: "/api/register",
            payload: {
                username:
                    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                email: "",
                password: "",
                confirmPassword: ""
            }
        });

        expect(res.statusCode).toBe(400);

        // Password and confirmPassword must match
        res = await app.inject({
            method: "POST",
            url: "/api/register",
            payload: {
                username: "",
                email: "",
                password: "a",
                confirmPassword: ""
            }
        });

        expect(res.statusCode).toBe(400);
    });

    it("should error because username is already in use", async () => {
        const res = await app.inject({
            method: "POST",
            url: "/api/register",
            payload: {
                username: "testing",
                email: "a",
                password: "a",
                confirmPassword: "a"
            }
        });

        expect(res.statusCode).toBe(400);
    });

    it("should successfully login", async () => {
        const res = await app.inject({
            method: "POST",
            url: "/api/login",
            payload: {
                email: "testing@gmail.com",
                password: "testing001"
            }
        });

        expect(res.statusCode).toBe(200);
    });

    it("should error because of incorrect credentials", async () => {
        // Email
        let res = await app.inject({
            method: "POST",
            url: "/api/login",
            payload: {
                email: "testin@gmail.com",
                password: "testing00"
            }
        });

        expect(res.statusCode).toBe(400);
        expect(res.json()).toEqual({ error: "Incorrect credentials" });

        // Passsord
        res = await app.inject({
            method: "POST",
            url: "/api/login",
            payload: {
                email: "testing@gmail.com",
                password: "testing00"
            }
        });

        expect(res.statusCode).toBe(400);
        expect(res.json()).toEqual({ error: "Incorrect credentials" });
    });
});

beforeAll(() => {
    process.env.NODE_ENV = "test";
});

afterAll(async () => {
    mongoose.connection.db.dropCollection("users", async (err) => {
        if (err) console.error(err);

        await mongoose.disconnect();
    });

    await app.close();
});
