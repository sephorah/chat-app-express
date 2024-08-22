import { StatusCodes } from "http-status-codes";
import { getProfiles } from "../models/profile";
import { Request, Response } from "express";

const getAllProfiles = async (req: Request, res: Response) => {
    const profiles = await getProfiles();

    res.status(StatusCodes.OK).send(profiles);
}


export { getAllProfiles };