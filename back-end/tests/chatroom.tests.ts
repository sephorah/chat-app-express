import prisma from "../src/client";
import { createChatroom, getChatrooms, getChatroom, updateChatroom, deleteChatroom } from "../src/models/chatroom";

afterEach(async () => {
    await prisma.chatroom.deleteMany({ where: { name: { startsWith: "test_chatroom_" } } })
});


describe("Chatroom model tests", () => {
    test("Add a new chatroom", async () => {
        const chatroom = await createChatroom({ name: "test_chatroom_Chatroom" });

        expect(chatroom).toStrictEqual({
            id: chatroom.id,
            name: "test_chatroom_Chatroom",
            createdAt: chatroom.createdAt
        })
    });

    test("Get a specific chatroom", async () => {
        const chatroom = await createChatroom({ name: "test_chatroom_Chatroom" });
        const retrievedChatroom = await getChatroom(chatroom.id);

        expect(retrievedChatroom).toStrictEqual({
            id: chatroom.id,
            name: "test_chatroom_Chatroom",
            createdAt: chatroom.createdAt
        })
    });

    test("Get chatrooms", async () => {
        const chatroom1 = await createChatroom({ name: "test_chatroom_Chatroom" });
        const chatroom2 = await createChatroom({ name: "test_chatroom_Chatroom2" });
        const chatrooms = await getChatrooms();

        expect(chatrooms).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "test_chatroom_Chatroom",
                    createdAt: chatroom1.createdAt
                }),
                expect.objectContaining({
                    name: "test_chatroom_Chatroom2",
                    createdAt: chatroom2.createdAt
                }),
            ])
        );
    });

    test("Update a chatroom", async () => {
        const chatroom = await createChatroom({ name: "test_chatroom_Chatroom" });
        const updatedChatroom = await updateChatroom(chatroom.id, { name: "test_chatroom_updatedChatroom" });

        expect(updatedChatroom).toStrictEqual({
            id: chatroom.id,
            name: "test_chatroom_updatedChatroom",
            createdAt: updatedChatroom.createdAt
        });
    });

    test("Delete a chatroom", async () => {
        const chatroom = await createChatroom({ name: "test_chatroom_Chatroom" });
        const deletedChatroom = await deleteChatroom(chatroom.id);
        const retrievedChatroom = await getChatroom(chatroom.id);

        expect(deletedChatroom).toStrictEqual({
            id: chatroom.id,
            name: "test_chatroom_Chatroom",
            createdAt: chatroom.createdAt
        });

        expect(retrievedChatroom).toBe(null);
    });
});