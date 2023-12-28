import express  from "express";
import userRouter from "./routes/users.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddlewares } from "./middlewares/error.js";
import cors from "cors"
export const app=express();
config({
    path:"./data/config.env",
});
const router=express.Router();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","POST","DELETE"],
    credentials:true,
}))
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);
app.get("/",(req,res)=>{
    res.send("Good Job!");
})
app.use(errorMiddlewares);
