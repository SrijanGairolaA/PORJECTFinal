import express, { Response} from "express"
import { Request } from "../types/custom.js"

const createPost = async(req:Request, res:Response): Promise<Response | void> =>{
    try {
        const { content, imgURL, videoURL, option1, ...options} = req.body;
        
        
    } catch (error) {
        console.error("server error while creating post", error)
        return res.status(501).json({
            message: "internal server error || error while creating post",
            error : error
        })
    }

}

export{
    createPost

}