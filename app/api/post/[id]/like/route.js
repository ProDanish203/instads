import { NextResponse } from "next/server";
import { connectDb } from "../../../../../lib/config/db";
import Post from "@/lib/models/Post";

export const POST = async (req, {params}) => {
    const {id} = params;
    try{
        await connectDb();
        const post = await Post.findById(id);
        return new NextResponse(JSON.stringify(post), {status: 200});
    }catch(error){
        return new NextResponse("An Error Occured", {status: 500});
    }
}