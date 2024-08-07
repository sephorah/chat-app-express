import { NextFunction, Request, Response } from "express";
import { registerSchema, loginSchema } from "../schema/user";
import { StatusCodes } from "http-status-codes";

const checkRegister = (req: Request, res: Response, next: NextFunction) => {
    if (registerSchema.safeParse(req.body).success &&
        req.body.password == req.body.confirmPassword) {
        next();
    } else {
        console.log(req.body)
        console.log(registerSchema.safeParse(req.body).error)
        res.status(StatusCodes.BAD_REQUEST).send("Bad request");
    }
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    if (loginSchema.safeParse(req.body).success) {
        next();
    } else {
        res.status(StatusCodes.BAD_REQUEST).send("Bad request");
    }
}

export { checkRegister, checkLogin };