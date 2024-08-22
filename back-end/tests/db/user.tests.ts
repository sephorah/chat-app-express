import prisma from "../../src/client";
import { createUser, getUser, getUsers, updateUser, deleteUser, getUserByUsername } from "../../src/models/user";

beforeAll(async () => {
    await prisma.user.deleteMany({ where: { username: { startsWith: "test_user_" } } });
});

afterEach(async () => {
    await prisma.user.deleteMany({ where: { username: { startsWith: "test_user_" } } });
});

describe("User model tests", () => {
    test("Add a new user", async () => {
        const user = await createUser({ username: "test_user_Seph", password: "test" });

        expect(user).toStrictEqual({
            id: user.id,
            username: "test_user_Seph",
            password: user.password,
            createdAt: user.createdAt,
        })
    });

    test("Get a specific user", async () => {
        const user = await createUser({ username: "test_user_Seph", password: "test" });
        const retrievedUser = await getUser(user.id)

        expect(retrievedUser).toStrictEqual({
            id: user.id,
            username: "test_user_Seph",
            password: user.password,
            createdAt: user.createdAt
        })
    });

    test("Get a specific user by username", async () => {
        const user = await createUser({ username: "test_user_Seph", password: "test" });
        const retrievedUser = await getUserByUsername(user.username);

        expect(retrievedUser).toStrictEqual({
            id: user.id,
            username: "test_user_Seph",
            password: user.password,
            createdAt: user.createdAt,
        })
    });

    test("Get users", async () => {
        const user1 = await createUser({ username: "test_user_Seph", password: "test" });
        const user2 = await createUser({ username: "test_user_Toto", password: "test" });
        const users = await getUsers();

        expect(users).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    username: "test_user_Seph",
                    password: user1.password,
                    createdAt: user1.createdAt
                }),
                expect.objectContaining({
                    username: "test_user_Toto",
                    password: user2.password,
                    createdAt: user2.createdAt
                }),
            ])
        );
    });

    test("Update a user", async () => {
        const user = await createUser({ username: "test_user_Seph", password: "test" });
        const updatedUser = await updateUser(user.id, { username: "test_user_Toto", password: "test1" });

        expect(updatedUser).toStrictEqual({
            id: user.id,
            username: "test_user_Toto",
            password: "test1",
            createdAt: user.createdAt
        });
    });

    test("Delete a user", async () => {
        const user = await createUser({ username: "test_user_Seph", password: "test" });
        const deletedUser = await deleteUser(user.id);
        const retrievedUser = await getUser(user.id);

        expect(deletedUser).toStrictEqual({
            id: user.id,
            username: "test_user_Seph",
            password: user.password,
            createdAt: user.createdAt
        });

        expect(retrievedUser).toBe(null);
    });
});