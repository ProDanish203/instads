"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deletePost } from "@/lib/actions/Post";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const DeletePostBtn = ({postId}: {postId: string}) => {
    
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    const performDeletion = async () => {
        setLoading(true);
        const {success, message} = await deletePost(postId, pathname);
        if(success) toast.success(message);
        else toast.error(message)
        setLoading(false);
    } 

  return (
    <>
    <AlertDialog>
    <AlertDialogTrigger className="optionsBtn text-red-600" title="Delete Post">Delete</AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            and data will be removed from our servers.
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={performDeletion} className="bg-red-500 text-white font-semibold text-[15px] hover:bg-red-600" disabled={loading}>Delete</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
    </>
  )
}
