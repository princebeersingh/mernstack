import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newPost=async(req,res,next)=>{
    try {const {title,description}=req.body;
    
    await Task.create({
        title,
        description,
        user:req.user,
    });
    res.status(201).json({
        success:true,
        message:"task added successfully",
    })

        
    } catch (error) {
        next(error)
    }
}
export const getMytasks=async(req,res,next)=>{
    try {
        const userid=req.user._id;
    const tasks=await Task.find({user:userid});
    res.status(200).json({
        success:true,
        tasks,
    })
    } catch (error) {
        next(error)
    }
}
export const updateTasks=async(req,res,next)=>{
    try {
        const tasks=await Task.findById(req.params.id);
    
    if(!tasks) return next(new ErrorHandler("id not found",404));
   

    tasks.isCompleted=!tasks.isCompleted
    await tasks.save();

    res.status(200).json({
        success:true,
        message:"task updated",
    });
    } catch (error) {
        next(error)
    }
}

export const deleteTasks=async(req,res,next)=>{
    try {
        const tasks=await Task.findById(req.params.id);
    if(!tasks) return next(new ErrorHandler("task not found",404));
    await tasks.deleteOne();
    res.status(200).json({
        success:true,
        message:"task deleted",
    });
    } catch (error) {
        next(error);
    }
}