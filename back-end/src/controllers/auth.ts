import { Profile, User } from "@prisma/client";
import { Request, Response } from "express";
import { compareSync, hashSync } from "bcryptjs";
import { saltRounds, secretJwt } from "../config";
import { createUser, getUserByUsername } from "../models/user";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { createProfile } from "../models/profile";

const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user: Omit<User, "id"|"createdAt"> = {
        username: username,
        password: hashSync(password, saltRounds)
    };
    
    try {
        const createdUser = await createUser(user);
        const profile: Omit<Profile, "id"> = {
            name: username,
            bio: "Hey!",
            userId: createdUser.id,
            photoUrl: null
        }
        await createProfile(profile);
    } catch (error) {
        res.status(StatusCodes.CONFLICT).send({
            error: "Username already taken"
        })
        return;
    }
    const accessToken = jwt.sign({ username: user.username }, secretJwt);
    const response = {
        accessToken: accessToken
    }
    res.status(StatusCodes.CREATED).send(response);
}

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const retrievedUser = await getUserByUsername(username);
    if (!retrievedUser) {
        res.status(StatusCodes.NOT_FOUND).send("User not found");
        return;
    }
    const matchPassword = compareSync(password, retrievedUser.password);
    if (!matchPassword) {
        res.status(StatusCodes.FORBIDDEN).send("Wrong password");
        return;
    }
    const accessToken = jwt.sign({ username: username }, secretJwt);
    const response = {
        accessToken: accessToken
    }
    res.status(StatusCodes.OK).send(response);
}

export { register, login };