import jwt from "jsonwebtoken";

const  AGE= parseInt(process.env.MAX_TIME)
export const sendCookie=(user,res,message,statusCode=200)=>{
   const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.status(statusCode)
    .cookie("token",token,{httpOnly:true,
        maxAge:15*1000*60,
        sameSite:process.env.NODE_ENV==="DEVELOPMENT"?"lax":"none",
        secure:process.env.NODE_ENV==="DEVELOPMENT"?false:true,
    })
    .json({
        success:true,
        message,
    })
}