import prisma from "../src/client";
import { User } from "@prisma/client";
import { createUser, getUser, getUsers, updateUser, deleteUser } from "../src/models/user";

afterEach(() => {
    prisma.user.deleteMany({ where: { username: { startsWith: "test_" } } });
});

describe("User model tests", () => {
    test("Add a new user", async () => {
        const user: User = await createUser({ username: "test_Seph", password: "test" });

        expect(user).toStrictEqual({
            id: user.id,
            username: "test_Seph",
            password: user.password,
            createdAt: user.createdAt
        })
    });

    test("Get a specific user", async () => {
        const user: User = await createUser({ username: "test_Seph", password: "test" });
        const retrievedUser: User = await getUser(user.id)

        expect(retrievedUser).toStrictEqual({
            id: user.id,
            username: "test_Seph",
            password: user.password,
            createdAt: user.createdAt
        })
    });

    test("Get users", async () => {
        const user1: User = await createUser({ username: "test_Seph", password: "test" });
        const user2: User = await createUser({ username: "test_Toto", password: "test" });
        const users: User[] = await getUsers();

        expect(users).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    username: "test_Seph",
                    password: user1.password,
                    createdAt: user1.createdAt
                }),
                expect.objectContaining({
                    username: "test_Toto",
                    password: user2.password,
                    createdAt: user2.createdAt
                }),
            ])
        );
    });

    test("Update a user", async () => {
        const user: User = await createUser({ username: "test_Seph", password: "test" });
        const updatedUser: User = await updateUser(user.id, { username: "test_Toto", password: "test1" });

        expect(updatedUser).toStrictEqual({
            id: user.id,
            username: "test_Toto",
            password: "test1",
            createdAt: user.createdAt
        });
    });

    test("Delete a user", async () => {
        const user: User = await createUser({ username: "test_Seph", password: "test" });
        const deletedUser: User = await deleteUser(user.id);
        const retrievedUser: User = await getUser(user.id);

        expect(deletedUser).toStrictEqual({
            id: user.id,
            username: "test_Seph",
            password: user.password,
            createdAt: user.createdAt
        });

        expect(retrievedUser).toBe(null);
    });
});