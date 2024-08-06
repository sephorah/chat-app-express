import { Profile } from "@prisma/client";
import { randomUUID } from "crypto";
import prisma from "../client";
import { getUser } from "./user";

const createProfile = async (data: Omit<Profile, "id">): Promise<Profile> => {
    return await prisma.profile.create({ data: { id: randomUUID(), ...data }});
}

const getProfiles = async (): Promise<Profile[]> => {
    return await prisma.profile.findMany();
}

const getProfile = async (id: string): Promise<Profile> => {
    return await prisma.profile.findUnique({
        where: {
            id
        },
    });
}

const updateProfile = async (id: string, data: Partial<Profile>): Promise<Profile> => {
    return await prisma.profile.update({
        where: {
            id
        },
        data: data
    });
}

const deleteProfile = async (id: string): Promise<Profile> => {
    return await prisma.profile.delete({
        where: {
            id: id
        }
    });
}


export { createProfile, getProfile, getProfiles, updateProfile, deleteProfile };