import type { StringValue } from "ms"
import { User } from "@prisma/client"
import jwt from "jsonwebtoken"

// namespace NodeJS{
//     interface ProcessEnv{
//         ACCESS_TOKEN_SECRET: string
//     }
// }



const genrateAccessToken = (user: User): string=>{
      return jwt.sign(
        {
            id: user.id,
            email:user.email,
            name:user.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY as StringValue
        }
      )
}
// process.env.ACCESS_TOKEN_EXPIRY as any
const genrateRefreshToken = (user: User): string=>{
    return jwt.sign(
        {
          id: user.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY as StringValue
        }
    ) 
} 

export {
    genrateAccessToken,
    genrateRefreshToken
}