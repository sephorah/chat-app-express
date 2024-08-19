import prisma from "../../src/client";
import { createChatroom } from "../../src/models/chatroom";
import { createMessage, getMessages, getMessagesFromChatroom, getMessage, updateMessage, deleteMessage } from "../../src/models/message";
import { createProfile } from "../../src/models/profile";
import { createUser } from "../../src/models/user";

afterEach(async () => {
    await prisma.profile.deleteMany({ where: { name: { startsWith: "test_message_" } } });
    await prisma.user.deleteMany({ where: { username: { startsWith: "test_message_" } } });
    await prisma.message.deleteMany({ where: { body: { startsWith: "test_message_" } } });
    await prisma.chatroom.deleteMany({ where: { name: { startsWith: "test_message_" } } });
});

describe("Message model tests", () => {
    test("Add a new message", async () => {
        const user = await createUser({ username: "test_message_Seph", password: "test" });
        const profile = await createProfile({ name: "test_message_Seph", bio: "hey", userId: user.id, photoUrl: null });
        const chatroom = await createChatroom({ name: "test_message_Chatroom", photoUrl: null });
        const message = await createMessage({ body: "test_message_Bjr tata", senderId: profile.id, chatroomId: chatroom.id });

        expect(message).toStrictEqual({
            id: message.id,
            createdAt: message.createdAt,
            body: "test_message_Bjr tata",
            read: false,
            senderId: profile.id,
            chatroomId: chatroom.id
        })
    });

    test("Get a specific message", async () => {
        const user = await createUser({ username: "test_message_Seph", password: "test" });
        const profile = await createProfile({ name: "test_message_Seph", bio: "hey", userId: user.id, photoUrl: null });
        const chatroom = await createChatroom({ name: "test_message_Chatroom", photoUrl: null });
        const message = await createMessage({ body: "test_message_Bjr tata", senderId: profile.id, chatroomId: chatroom.id });
        const retrievedMessage = await getMessage(message.id)

        expect(retrievedMessage).toStrictEqual({
            id: message.id,
            createdAt: message.createdAt,
            body: "test_message_Bjr tata",
            read: false,
            senderId: profile.id,
            chatroomId: chatroom.id
        })
    });

    test("Get messages", async () => {
        const user = await createUser({ username: "test_message_Seph", password: "test" });
        const profile = await createProfile({ name: "test_message_Seph", bio: "hey", userId: user.id, photoUrl: null  });
        const chatroom = await createChatroom({ name: "test_message_Chatroom", photoUrl: null });
        const message1 = await createMessage({ body: "test_message_Bjr tata", senderId: profile.id, chatroomId: chatroom.id });
        const message2 = await createMessage({ body: "test_message_Okay", senderId: profile.id, chatroomId: chatroom.id });
        const messages = await getMessages();

        expect(user).toEqual(
            {
                id: user.id,
                username: "test_message_Seph",
                password: user.password,
                createdAt: user.createdAt
            }
        )
        expect(messages).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    createdAt: message1.createdAt,
                    body: "test_message_Bjr tata",
                    read: false,
                    senderId: profile.id,
                    chatroomId: chatroom.id
                }),
                expect.objectContaining({
                    createdAt: message2.createdAt,
                    body: "test_message_Okay",
                    read: false,
                    senderId: profile.id,
                    chatroomId: chatroom.id
                }),
            ])
        );
    });

    test("Get messages from specific chatroom", async () => {
        const user = await createUser({ username: "test_message_Seph", password: "test" });
        const profile = await createProfile({ name: "test_message_Seph", bio: "hey", userId: user.id, photoUrl: null  });
        const chatroom = await createChatroom({ name: "test_message_Chatroom", photoUrl: null});
        const chatroom2 = await createChatroom({ name: "test_message_Chatroom2", photoUrl: null });
        await createMessage({ body: "test_message_Bjr tata", senderId: profile.id, chatroomId: chatroom2.id });
        const message2 = await createMessage({ body: "test_message_Okay", senderId: profile.id, chatroomId: chatroom.id });
        const messages = await getMessagesFromChatroom(chatroom.id);

        expect(messages).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    createdAt: message2.createdAt,
                    body: "test_message_Okay",
                    read: false,
                    senderId: profile.id,
                    chatroomId: chatroom.id
                }),
            ])
        );
    });

    test("Update a message", async () => {
        const user = await createUser({ username: "test_message_Seph", password: "test" });
        const profile = await createProfile({ name: "test_message_Seph", bio: "hey", userId: user.id, photoUrl: null  });
        const chatroom = await createChatroom({ name: "test_message_Chatroom", photoUrl: null });
        const message = await createMessage({ body: "test_message_Bjr tata", senderId: profile.id, chatroomId: chatroom.id });
        const updatedMessage = await updateMessage(message.id, { read: true });

        expect(updatedMessage).toStrictEqual({
            id: message.id,
            createdAt: message.createdAt,
            body: "test_message_Bjr tata",
            read: true,
            senderId: profile.id,
            chatroomId: chatroom.id
        });
    });

    test("Delete a message", async () => {
        const user = await createUser({ username: "test_message_Seph", password: "test" });
        const profile = await createProfile({ name: "test_message_Seph", bio: "hey", userId: user.id, photoUrl: null  });
        const chatroom = await createChatroom({ name: "test_message_Chatroom", photoUrl: null });
        const message = await createMessage({ body: "test_message_Bjr tata", senderId: profile.id, chatroomId: chatroom.id });
        const deletedMessage = await deleteMessage(message.id);
        const retrievedMessage = await getMessage(message.id);

        expect(deletedMessage).toStrictEqual({
            id: message.id,
            createdAt: message.createdAt,
            body: "test_message_Bjr tata",
            read: false,
            senderId: profile.id,
            chatroomId: chatroom.id
        });

        expect(retrievedMessage).toBe(null);
    });
});