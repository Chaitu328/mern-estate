import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../Utils/error.js";

export const signupController = async (req, res,next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });
    try {
        await newUser.save();
        res.status(201).json({ message: "User signed up successfully"});
    } catch (error) {
        next(error);
    }
}