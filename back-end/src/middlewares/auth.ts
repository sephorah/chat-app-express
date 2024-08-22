import { NextFunction, Request, Response } from "express";
import { registerSchema, loginSchema } from "../schema/user";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { secretJwt } from "../config";

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

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken;
    
    if (!accessToken) {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
    jwt.verify(accessToken, secretJwt, (err, user) => {
        if (err) {
            return res.sendStatus(StatusCodes.FORBIDDEN);
        }
        next();
    })
}

export { checkRegister, checkLogin, checkAuth };