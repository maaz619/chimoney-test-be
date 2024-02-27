import { NextFunction, Request, Response } from "express";
import { client } from "./utils";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt
    if (!token) {
        res.status(401).json({ message: 'Not a valid token' })
        return
    }
    const { data: { user } } = await client.auth.getUser(token)
    if (!user)
        return res.status(401).json({
            code: "401",
            message: "unauthorize access"
        })
    next()

}