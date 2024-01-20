"use server"
import { getAuthSession } from "@/utils/auth"
import { revalidatePath } from "next/cache"
import { connectDb } from "../config/db";
import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comment";

interface PostProps{
    caption?: string;
    fileUrl: string;
}

export const createPost = async ({caption, fileUrl}: PostProps) => {
    try{
        const session = await getAuthSession();
        if(!session) 
            return {success: false, message: "Authentication Error"} 

        await connectDb();

        const post = await Post.create({
            caption: caption || "",
            image: fileUrl,
            author: session.user.id
        });
        
        await User.findByIdAndUpdate(session.user.id, {
            $push: {posts: post.id}
        })

        if(post){
            return {success: true, message: "Post created successfully"} 
        }else{
            return {success: false, message: "An error occured while creating post"} 
        }

    }catch(error: any){
        throw new Error(`Failed to fetch User data: ${error.message}`)
    }finally{
        revalidatePath('/');
    }
}

export const getPosts = async () => {
    try{
        const session = await getAuthSession();
        if(!session) 
            return {success: false, message: "Authentication Error"} 

        await connectDb();

        const posts = await Post.find()
        .populate({
            path: 'author',
            model: User,
            select: "username image id"
        })
        .populate({
            path: "comments",
            model: Comment,
            options: { limit: 3 }, 
            populate: {
                path: 'author',
                model: User,
                select: "username id image"
            }
        })
        .limit(10);
        ;

        if(posts){
            return {posts,success: true, message: "Posts fetched successfully"} 
        }else{
            return {success: false, message: "An error occured while fetching the posts"} 
        }

    }catch(error: any){
        throw new Error(`Failed to fetch User data: ${error.message}`)
    }finally{
        revalidatePath('/');
    }
}

