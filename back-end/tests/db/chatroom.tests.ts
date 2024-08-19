import prisma from "../../src/client";
import { createChatroom, getChatrooms, getChatroom, updateChatroom, deleteChatroom } from "../../src/models/chatroom";
import { createProfile } from "../../src/models/profile";
import { createUser } from "../../src/models/user";

beforeAll(async () => {
    await prisma.user.deleteMany({ where: { username: { startsWith: "test_chatroom_" } } });
    await prisma.profile.deleteMany({ where: { name: { startsWith: "test_chatroom_" } } }); 
    await prisma.chatroom.deleteMany({ where: { name: { startsWith: "test_chatroom_" } } })
});

afterEach(async () => {
    await prisma.user.deleteMany({ where: { username: { startsWith: "test_chatroom_" } } });
    await prisma.profile.deleteMany({ where: { name: { startsWith: "test_chatroom_" } } }); 
    await prisma.chatroom.deleteMany({ where: { name: { startsWith: "test_chatroom_" } } })
});

describe("Chatroom model tests", () => {
    test("Add a new empty chatroom", async () => {
        const chatroom = await createChatroom({ name: "test_chatroom_Chatroom", photoUrl: null }, []);

        expect(chatroom).toStrictEqual({
            id: chatroom.id,
            name: "test_chatroom_Chatroom",
            createdAt: chatroom.createdAt,
            photoUrl: null,
            members: []
        })
    });

    test("Add a new chatroom with members", async () => {
        const user1 = await createUser({ username: "test_chatroom_Seph", password: "test" });
        const user2 = await createUser({ username: "test_chatroom_Toto", password: "test1" });
        const profile1 = await createProfile({ name: "test_chatroom_Seph", bio: "hey", userId: user1.id, photoUrl: null });
        const profile2 = await createProfile({ name: "test_chatroom_Toto", bio: "hi", userId: user2.id, photoUrl: null });
        const chatroom = await createChatroom({ name: "test_chatroom_Chatroom",
            photoUrl: null}, [profile1.id, profile2.id]);

        expect(chatroom).toStrictEqual({
            id: chatroom.id,
            name: "test_chatroom_Chatroom",
            createdAt: chatroom.createdAt,
            photoUrl: null,
            members: [profile1, profile2]
        })
    });

    test("Get a specific chatroom", async () => {
        const chatroom = await createChatroom({ name: "test_chatroom_Chatroom", photoUrl: null }, []);
        const retrievedChatroom = await getChatroom(chatroom.id);

        expect(retrievedChatroom).toStrictEqual({
            id: chatroom.id,
            name: "test_chatroom_Chatroom",
            createdAt: chatroom.createdAt,
            photoUrl: null
        })
    });

    test("Get chatrooms", async () => {
        const chatroom1 = await createChatroom({ name: "test_chatroom_Chatroom", photoUrl: null }, []);
        const chatroom2 = await createChatroom({ name: "test_chatroom_Chatroom2", photoUrl: null }, []);
        const chatrooms = await getChatrooms();

        expect(chatrooms).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "test_chatroom_Chatroom",
                    createdAt: chatroom1.createdAt,
                    photoUrl: null
                }),
                expect.objectContaining({
                    name: "test_chatroom_Chatroom2",
                    createdAt: chatroom2.createdAt,
                    photoUrl: null
                }),
            ])
        );
    });

    test("Update a chatroom", async () => {
        const user = await createUser({ username: "test_chatroom_Tata", password: "test" });
        const profile = await createProfile({ name: "test_chatroom_Tata", bio: "hey",
            userId: user.id, photoUrl: null });
        const user1 = await createUser({ username: "test_chatroom_Seph", password: "test" });
        const profile1 = await createProfile({ name: "test_chatroom_Seph", bio: "hey",
            userId: user1.id, photoUrl: null });
        const user2 = await createUser({ username: "test_chatroom_Toto", password: "test" });
        const profile2 = await createProfile({ name: "test_chatroom_Toto", bio: "hey",
            userId: user2.id, photoUrl: null });
        const chatroom = await createChatroom({ name: "test_chatroom_Chatroom", photoUrl: null },
            [profile2.id, profile.id]);
        const updatedChatroom = await updateChatroom(chatroom.id,
            { name: "test_chatroom_updatedChatroom" },
            [profile1.id, profile2.id]
        );

        expect(updatedChatroom).toStrictEqual({
            id: chatroom.id,
            name: "test_chatroom_updatedChatroom",
            createdAt: updatedChatroom.createdAt,
            photoUrl: null,
            members: [profile1, profile2]
        });
    });

    test("Delete a chatroom", async () => {
        const chatroom = await createChatroom({ name: "test_chatroom_Chatroom", photoUrl: null }, []);
        const deletedChatroom = await deleteChatroom(chatroom.id);
        const retrievedChatroom = await getChatroom(chatroom.id);

        expect(deletedChatroom).toStrictEqual({
            id: chatroom.id,
            name: "test_chatroom_Chatroom",
            createdAt: chatroom.createdAt,
            photoUrl: null
        });

        expect(retrievedChatroom).toBe(null);
    });
});