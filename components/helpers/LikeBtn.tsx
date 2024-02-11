"use client"
import { likePost } from '@/lib/actions/Post';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useOptimistic } from 'react';
import { toast } from 'sonner';

interface Props{
    postId: string;
    likes: Like[]
}
interface Like{
    id: string;
}

export const LikeBtn = ({postId, likes}: Props) => {

    const {data: session, status} = useSession();
    const pathname = usePathname();

    const predicate = (like:Like) => {
        like.id == session?.user.id
    }

    const [optimisticLikes, addOptimisticLikes] = useOptimistic(
        likes,
        (state: Like[], newLike: Like) => 
            state.some(predicate) 
            ? state.filter((like) => like.id != session?.user.id) 
            : [...state, newLike]
    )
    const addLike = async () => {
        // if(!session) return toast.error("Please login to like post")
        // addOptimisticLikes({id: session.user.id})
        
        // await likePost({postId,pathname}); 
        const res = await fetch(`/api/post/${postId}/like`, {
            method: "POST"
        })
        const data = await res.json();
        console.log(data)
    }
    
  return (
    // <div onClick={addLike}>
    //     {/* @ts-ignore */}
    //     <i className={`${optimisticLikes.includes(session?.user.id) ? "fas fa-heart text-red-500" : "far fa-heart"} cursor-pointer`}></i>
    // </div>
    <div onClick={addLike}>
        {/* @ts-ignore */}
        <i className={`${likes.includes(session?.user.id) ? "fas fa-heart text-red-500" : "far fa-heart"} cursor-pointer`}></i>
    </div>
  )
}
