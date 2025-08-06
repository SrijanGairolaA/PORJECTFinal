import { NextFunction,Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { string } from "zod";
import { Request } from "../types/custom.js";
// interface CoustomRequest extends Request {
//     cookies: {
//         accessToken?: string;
//     };
//     user?:{
//         id: string
//     }
// }

export const verifyJWT: RequestHandler = async(req: Request, res: Response, next: NextFunction):Promise<void>=>{
    try {
        const token : string = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
    return next(new Error("Unauthorized : NO access token provided"));
    }

        
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return next(new Error("Unauthorized: Invalid or expired token"))
        
    }
}