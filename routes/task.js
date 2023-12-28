import express from "express";
import { deleteTasks, getMytasks, newPost, updateTasks } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router=express.Router();



router.post("/new",isAuthenticated,newPost);
router.get("/all",isAuthenticated,getMytasks);
router.route("/:id").put(isAuthenticated,updateTasks).delete(isAuthenticated,deleteTasks);


export default router