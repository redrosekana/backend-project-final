// import library
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"

// import model
import User_member from "../model/user-member";

export default async function UpdatePassword(req:Request, res:Response) {
    const secret_wait_email = process.env.SECRET_WAITEMAIL as string

    const { password , token } = req.body

    if (!password || !token) {
        res.status(400).json({
            message:"need password and token"
        })
    }else {
        try {
            const decode = jwt.verify(token as string,secret_wait_email)
            
            const infomation:any = decode
            const saltRounds:number = Number(process.env.SALTROUNDS)
            const hashPassword = await bcrypt.hash(String(password),saltRounds)
            
            if (typeof infomation === "object") {
                const user = await User_member.findOne({email:{$eq:infomation.email}})
                await User_member.findByIdAndUpdate(String(user?._id),{
                    password:hashPassword
                })
    
                res.status(200).json({
                    "message":"update password success"
                })
            }
        }catch(err:any) {
            if (err.message === "jwt expired") {
                res.status(400).json({
                    "message":"jwt expired token"
                })
            }else {
                res.status(500).json({
                    "message":"occurred error in server"
                })
            }
        }
    }
}