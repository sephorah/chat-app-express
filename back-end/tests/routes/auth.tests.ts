import request from "supertest";
import app from "../../src/server";
import { StatusCodes } from "http-status-codes";
import prisma from "../../src/client";

beforeAll(async () => {
    await prisma.user.deleteMany({ where: { username: { startsWith: "test_register_" } } })
});

afterEach(async () => {
    await prisma.user.deleteMany({ where: { username: { startsWith: "test_register_" } } })
});

describe("Test auth routes", () => {
    test("Register a new user", async () => {
        const payload = { "username": "test_register_Seph", "password": "password1",
            "confirmPassword": "password1"
        };
        const response = await request(app).post("/signup").send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
        expect(response.status).toBe(StatusCodes.CREATED);
        expect(response.body.accessToken).toBeDefined();
        expect(response.body.user).toStrictEqual({
            id: response.body.user.id,
            username: payload.username,
            password: response.body.user.password,
            createdAt: response.body.user.createdAt,
            profile: {
                id: response.body.user.profile.id,
                name: payload.username,
                bio: "Hey!",
                userId: response.body.user.id,
                photoUrl: null
            }
        });
    });

    test("Login with an existing user", async () => {
        const payload = { "username": "test_register_Seph", "password": "password1",
            "confirmPassword": "password1"
        };
        await request(app).post("/signup").send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
        const body = { "username": "test_register_Seph", "password": "password1" };
        const response = await request(app).post("/login").send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.accessToken).toBeDefined();
        expect(response.body.user).toStrictEqual({
            id: response.body.user.id,
            username: payload.username,
            password: response.body.user.password,
            createdAt: response.body.user.createdAt,
            profile: {
                id: response.body.user.profile.id,
                name: payload.username,
                bio: "Hey!",
                userId: response.body.user.id,
                photoUrl: null
            }
        });
    });

    test("Login with a wrong password", async () => {
        const payload = { "username": "test_register_Seph", "password": "password1",
            "confirmPassword": "password1"
        };
        await request(app).post("/signup").send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
        const body = { "username": "test_register_Seph", "password": "password2" };
        const response = await request(app).post("/login").send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

        expect(response.status).toBe(StatusCodes.FORBIDDEN);
        expect(response.body.accessToken).toBeUndefined();
    });

    test("Login with a wrong username", async () => {
        const payload = { "username": "test_register_Seph", "password": "password1",
            "confirmPassword": "password1"
        };
        await request(app).post("/signup").send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
        const body = { "username": "test_register_Seph1", "password": "password1" };
        const response = await request(app).post("/login").send(body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.accessToken).toBeUndefined();
    });
})

