import { errorHandler } from "../Utils/error.js";
import jwt from "jsonwebtoken";

export const verifyUserToken = (req, res, next) => {
     // As we created cookie name as access_token
    //  console.log(req.cookies)
     const token = req.cookies.access_token;
     if(!token) return next(errorHandler(401,"You are not authenticated!"));
 
     jwt.verify(token,process.env.JWT_SECRET,(err,user)=>
         {
             if(err) return next(errorHandlerorHandler(403,"Token is not valid!"));
             req.user = user;
             next()
         })
}