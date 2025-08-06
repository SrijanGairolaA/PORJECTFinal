import { User } from "@prisma/client"
import bcrypt from "bcrypt"

const encryptPassword = async(password: String)=>{
     return await bcrypt.hash(password, 10)
}

const isPasswordCorrect = async(user: User, password: String)=>{
      return await bcrypt.compare(password, user.password)
}


export {
    encryptPassword,
    isPasswordCorrect
}