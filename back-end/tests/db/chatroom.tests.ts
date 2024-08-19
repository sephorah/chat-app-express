import prisma from "../../src/client";
import { createChatroom, getChatrooms, getChatroom, updateChatroom, deleteChatroom } from "../../src/models/chatroom";

afterEach(async () => {
    await prisma.chatroom.deleteMany({ where: { name: { startsWith: "test_chatroom_" } } })
});


describe("Chatroom model tests", () => {
    test("Add a new chatroom", async () => {
        const chatroom = await createChatroom({ name: "test_chatroom_Chatroom", photoUrl: null });

        expect(chatroom).toStrictEqual({
            id: chatroom.id,
            name: "test_chatroom_Chatroom",
            createdAt: chatroom.createdAt,
            photoUrl: null
        })
    });

    test("Get a specific chatroom", async () => {
        const chatroom = await createChatroom({ name: "test_chatroom_Chatroom", photoUrl: null });
        const retrievedChatroom = await getChatroom(chatroom.id);

        expect(retrievedChatroom).toStrictEqual({
            id: chatroom.id,
            name: "test_chatroom_Chatroom",
            createdAt: chatroom.createdAt,
            photoUrl: null
        })
    });

    test("Get chatrooms", async () => {
        const chatroom1 = await createChatroom({ name: "test_chatroom_Chatroom", photoUrl: null });
        const chatroom2 = await createChatroom({ name: "test_chatroom_Chatroom2", photoUrl: null });
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
        const chatroom = await createChatroom({ name: "test_chatroom_Chatroom", photoUrl: null });
        const updatedChatroom = await updateChatroom(chatroom.id, { name: "test_chatroom_updatedChatroom" });

        expect(updatedChatroom).toStrictEqual({
            id: chatroom.id,
            name: "test_chatroom_updatedChatroom",
            createdAt: updatedChatroom.createdAt,
            photoUrl: null
        });
    });

    test("Delete a chatroom", async () => {
        const chatroom = await createChatroom({ name: "test_chatroom_Chatroom", photoUrl: null });
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