"use server"
import { getAuthSession } from "@/utils/auth"
import { revalidatePath, unstable_noStore as noStore } from "next/cache"
import { connectDb } from "../config/db";
import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comment";
import mongoose from "mongoose";


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
        noStore();

        const posts = await Post.find()
        .populate({
            path: 'author',
            model: 'User',
            select: "username image id"
        })
        // .populate({
        //     path: "comments",
        //     model: Comment,
        //     options: { limit: 3 }, 
        //     populate: {
        //         path: 'author',
        //         model: User,
        //         select: "username id image"
        //     }
        // })
        .limit(10)
        .sort({createdAt: -1})
        ;

        if(posts){
            return {posts,success: true, message: "Posts fetched successfully"} 
        }else{
            return {success: false, message: "An error occured while fetching the posts"} 
        }

    }catch(error: any){
        throw new Error(`Failed to fetch User data: ${error.message}`)
    }
}


export const deletePost = async (postId: string, pathname: string) => {
    try{
        const session = await getAuthSession();
        if(!session) 
            return {success: false, message: "Authentication Error"} 

        await connectDb();

        const post = await Post.findByIdAndDelete(postId);

        await User.findByIdAndUpdate(session.user.id, {
            $pull: { posts: postId }
        })

        await Comment.deleteMany({parent: postId});
        
        if(post){
            return {success: true, message: "Post deleted successfully"} 
        }else{
            return {success: false, message: "An error occured while deleting the post"} 
        }

    }catch(error: any){
        throw new Error(`Failed to fetch User data: ${error.message}`)
    }finally{
        revalidatePath(pathname);
    }
}


export const likePost = async ({postId, pathname}: {postId: string, pathname: string}) => {
    try{
        const session = await getAuthSession();
        if(!session) 
            return {success: false, message: "Authentication Error"} 

        await connectDb();

        const post = await Post.findById(postId);
        if(!post)
            return {success: true, message: "Post not found"}
        
        // Checks if the user has already liked the tweet or not 
        const isLiked = post.likes.includes(session.user.id);

        const updateQuery = isLiked 
        ? { $pull: { likes: session.user.id}}
        : { $addToSet: { likes: session.user.id}}

        const updatedPost = await Post.findByIdAndUpdate(postId, updateQuery, {new: true})

        if(updatedPost){
            return {success: true, message: "Post liked successfully"} 
        }else{
            return {success: false, message: "An error occured while liking the post"} 
        }

    }catch(error: any){
        throw new Error(`Failed to fetch User data: ${error.message}`)
    }finally{
        revalidatePath(pathname);
    }
}

