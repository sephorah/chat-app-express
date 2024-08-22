import request from "supertest";
import app from "../../src/server";
import { StatusCodes } from "http-status-codes";
import prisma from "../../src/client";

beforeAll(async () => {
    await prisma.user.deleteMany({ where: { username: { startsWith: "test_profile_route_" } } })
});

afterEach(async () => {
    await prisma.user.deleteMany({ where: { username: { startsWith: "test_profile_route_" } } })
});

describe("Test profile routes", () => {
    test("Get all profiles", async () => {
        const payload = {
            "username": "test_profile_route_Seph", "password": "password1",
            "confirmPassword": "password1"
        };
        const userResponse = await request(app).post("/signup").send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        const payload2 = {
            "username": "test_profile_route_Tata", "password": "password",
            "confirmPassword": "password"
        };
        await request(app).post("/signup").send(payload2)
        const response = await request(app).get("/profiles")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', `accessToken=${userResponse.body.accessToken}`);

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "test_profile_route_Seph",
                    bio: "Hey!",
                    photoUrl: null
                }),
                expect.objectContaining({
                    name: "test_profile_route_Tata",
                    bio: "Hey!",
                    photoUrl: null
                }),
            ])
        );
    });
})

