import { Response } from "express";
import { TUser } from "../types/user";
import dotenv from "dotenv";

dotenv.config();

export const sendApiResponse = (user: TUser, statusCode: number, res: Response) => {
    const token = user.createJWT();
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' as 'none' | 'lax',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
    
    

    res.status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            token,
            user,
        });
};
