import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../Utils/error.js";

export const testController =(req,res)=>{
    res.json({message:"User route working"});
}

export const updateUserController = async (req,res,next)=>{
   if(req.params.id !== req.user.id) return next(errorHandler(401,"You can only update your account!"));

   try {
    if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password,10);      
   }
   const updatedUser = await User.findByIdAndUpdate(req.params.id,{
    $set:{
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        avatar:req.body.avatar,
    },
    },{new:true})
    const {password,...rest} = updatedUser._doc;
    res.status(200).json(rest)
   } catch (error) {
        next(error)
   }
}

export const deleteUserController = async (req,res,next)=>{
    try {
        if(req.user.id !== req.params.id) return next(errorHandler(401,"You can only delete your account!"));
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie("access_token")
        res.status(200).json("User has been deleted successfully!")
    } catch (error) {
        next(error)
    }
}