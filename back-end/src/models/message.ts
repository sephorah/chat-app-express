import { Message } from "@prisma/client";
import { randomUUID } from "crypto";
import prisma from "../client";

const createMessage = async (data: Omit<Message, "id"|"createdAt"|"read">): Promise<Message> => {
    return await prisma.message.create({ data: { id: randomUUID(), read: false, ...data }});
}

const getMessages = async (): Promise<Message[]> => {
    return await prisma.message.findMany();
}

const getMessage = async (id: string): Promise<Message> => {
    return await prisma.message.findUnique({
        where: {
            id
        },
    });
}

const getMessagesFromChatroom = async (chatroomId: string): Promise<Message[]> => {
    return await prisma.message.findMany({
        where: {
            chatroomId: chatroomId
        }
    });
}

const updateMessage = async (id: string, data: Partial<Message>): Promise<Message> => {
    return await prisma.message.update({
        where: {
            id
        },
        data: data
    });
}

const deleteMessage = async (id: string): Promise<Message> => {
    return await prisma.message.delete({
        where: {
            id: id
        }
    });
}

export { createMessage, getMessages, getMessage, getMessagesFromChatroom, updateMessage, deleteMessage };