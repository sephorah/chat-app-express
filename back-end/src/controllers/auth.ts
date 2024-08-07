import { User } from "@prisma/client";
import { Request, Response } from "express";
import { hashSync } from "bcryptjs";
import { saltRounds, secretJwt } from "../config";
import { createUser } from "../models/user";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user: Omit<User, "id"|"createdAt"> = {
        username: username,
        password: hashSync(password, saltRounds)
    }

    try {
        await createUser(user);
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

export { register };