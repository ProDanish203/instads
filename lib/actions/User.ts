"use server"
import { getAuthSession } from "@/utils/auth"
import { revalidatePath } from "next/cache"
import { connectDb } from "../config/db";
import User from "../models/User";
import bcrypt from "bcrypt";

interface RegisterProps{
    name: string;
    username: string;
    email: string;
    password: string;
}

export const registerUser = async ({email,name, password, username}: RegisterProps) => {
    try{
        await connectDb();
        const userExists = await User.findOne({
            $or: [
              { email: email },
              { username: username }
            ]
        });
          
        if (userExists) {
            if (userExists.email === email) {
              return { success: false, message: "Email already in use" };
            } else if (userExists.username === username) {
              return { success: false, message: "Username already in use" };
            }
        }

        const hashPass = await bcrypt.hash(password, 10);
        if(!hashPass) 
            return { success: false, message: "Failed to store password" };
        const user = await User.create({
            username,
            name, 
            email,
            password: hashPass
        })

        if(user){
            return {success: true, message: "Registeration success"}
        }else{
            return {success: false, message: "Failed to register user"}
        }

    }catch(error:any){
        throw new Error(`Failed to fetch User data: ${error.message}`)
    }finally{
        revalidatePath("/");
    }
}