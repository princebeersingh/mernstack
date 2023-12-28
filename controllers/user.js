import { User } from "../models/user.js";
import bcrypt, { compare } from "bcrypt";
import {sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


// export const getAllusers=async(req,res)=>{}

export const register=async(req,res,next)=>
{
    try {
        const {name,email,password}=req.body;
    let user=await User.findOne({email})
    if(user) return next(new ErrorHandler("User already exists",400));
    // if(user) return res.status(404).json({
    //     success:false,
    //     message:"User already exists",
    // })
    const hashpassword=await bcrypt.hash(password,10);
    user=await User.create({name,email,password:hashpassword});
    sendCookie(user,res,"registered Successfully",201);
    } catch (error) {
        next(error);
    }
} 


export const login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
    const user=await User.findOne({email}).select("+password");
    if(!user) return next(new ErrorHandler("invalid Email or Password",400));
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) return next(new ErrorHandler("invalid Email or Password",400));
    // if(!isMatch) return res.status(404).json({
    //     success:false,
    //     message:"invalid Email or Password",
    // })
    sendCookie(user,res,`Wellcome back , ${user.name}`,200);
        
    } catch (error) {
        next(error)
    }
}

export const getMyProfile=async(req,res,next)=>{
    try {
        res.status(200).json({
            success:true,
            user:req.user,
        })
    } catch (error) {
        next(error)
    }
}


export const logout=(req,res,next)=>{
    try {
        res.status(200).cookie("token","",{
            expires:new Date(Date.now()),
            sameSite:process.env.NODE_ENV==="DEVELOPMENT"?"lax":"none",
            secure:process.env.NODE_ENV==="DEVELOPMENT"?false:true,
        }).json({
            success:true,
            user:req.user,
        })
    } catch (error) {
        next(error)
    }
}

