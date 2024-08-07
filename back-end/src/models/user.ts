import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import prisma from "../client";

const createUser = async (data: Omit<User, "id"|"createdAt">): Promise<User> => {
    return await prisma.user.create({ data: { id: randomUUID(), ...data }});
}

const getUsers = async (): Promise<User[]> => {
    return await prisma.user.findMany();
}

const getUser = async (id: string): Promise<User> => {
    return await prisma.user.findUnique({
        where: {
            id
        },
    });
}

const getUserByUsername = async (username: string): Promise<User> => {
    return await prisma.user.findUnique({
        where: {
            username: username
        },
    });
}

const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
    return await prisma.user.update({
        where: {
            id
        },
        data: data
    });
}

const deleteUser = async (id: string): Promise<User> => {
    return await prisma.user.delete({
        where: {
            id: id
        }
    });
}

export { createUser, getUser, getUserByUsername, updateUser, deleteUser, getUsers };