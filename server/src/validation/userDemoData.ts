import {email, z} from "zod"

export const userDemographihcSchema = z.object({
    gender: z.enum(['male','female', 'transgender']),
    age: z.number().min(13).max(120),
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const userDataSchema = z.object({
    name: z.string().min(1,{message: "Name is required"}),
    email: z.string().regex(emailRegex, {message: "Invalid email format"}),
    password: z.string().min(6,{message: "Password must be at least 6 charectors"})
})