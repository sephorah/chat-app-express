import { Chatroom } from "@prisma/client";
import { randomUUID } from "crypto";
import prisma from "../client";

const createChatroom = async (data: Omit<Chatroom, "id"|"createdAt">,
    members: string[]
): Promise<Chatroom> => {
    return await prisma.chatroom.create({ data: { id: randomUUID(), ...data,
        members: {
            connect: members.map((id) => { return { id: id } })
        }
     },
    include: {
        members: true
    }});
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

const updateChatroom = async (id: string, data: Partial<Chatroom>, members: string[]): Promise<Chatroom> => {
    return await prisma.chatroom.update({
        where: {
            id
        },
        data: {
            ...data,
            members: {
                set: members.map((id) => { return { id: id } })
            }
        }
    , include: {
        members: true
    }});
}

const deleteChatroom = async (id: string): Promise<Chatroom> => {
    return await prisma.chatroom.delete({
        where: {
            id: id
        }
    });
}


export { createChatroom, getChatrooms, getChatroom, updateChatroom, deleteChatroom };