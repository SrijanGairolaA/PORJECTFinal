import express, {Application, Request, Response} from "express"
import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser"

const app: Application = express()

const PORT = process.env.PORT || 7000

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// app.get("/", (req: Request, res: Response)=>{
//     return res.send("hey")

// })

// route file
import routes from "./routes/index.js"

app.use(routes)


app.listen(PORT, ()=> console.log(`server is listining at port ${PORT}`))