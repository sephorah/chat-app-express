import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { getUsers } from "../models/user";

const getAllUsers = async (req: Request, res: Response) => {
    const users = await getUsers();

    res.status(StatusCodes.OK).send(users);
}


export { getAllUsers };