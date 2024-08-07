import request from "supertest";
import app from "../../src/server";
import { StatusCodes } from "http-status-codes";
import prisma from "../../src/client";

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
        .set('Accept', 'application/json')

        expect(response.status).toBe(StatusCodes.CREATED);
        expect(response.body.accessToken).toBeDefined();
    });
})

// const request = require('supertest');
// const app = require('./app');

// test('returns a list of users', async () => {
//     const response = await request(app).get('/users');
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' },]);
// });