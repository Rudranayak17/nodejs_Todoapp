import express from "express";

import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
export const app = express();
config({
    path:"./data/config.env"
})

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FONTEND_URL],
    methods:['GET', 'POST','PUT','DELETE'],
    credentials:true    
}))
//using routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/task",taskRouter)

app.get("/",(req, res) => {
    res.send("hello")
})


//Using error Middleware
app.use(errorMiddleware)