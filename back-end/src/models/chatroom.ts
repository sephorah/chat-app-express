import { Chatroom } from "@prisma/client";
import { randomUUID } from "crypto";
import prisma from "../client";

const createChatroom = async (data: Omit<Chatroom, "id"|"createdAt">): Promise<Chatroom> => {
    return await prisma.chatroom.create({ data: { id: randomUUID(), ...data }});
}

const getChatrooms = async (): Promise<Chatroom[]> => {
    return await prisma.chatroom.findMany();
}

const getChatroom = async (id: string): Promise<Chatroom> => {
    return await prisma.chatroom.findUnique({
        where: {
            id
        },
    });
}

const updateChatroom = async (id: string, data: Partial<Chatroom>): Promise<Chatroom> => {
    return await prisma.chatroom.update({
        where: {
            id
        },
        data: data
    });
}

const deleteChatroom = async (id: string): Promise<Chatroom> => {
    return await prisma.chatroom.delete({
        where: {
            id: id
        }
    });
}


export { createChatroom, getChatrooms, getChatroom, updateChatroom, deleteChatroom };