import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MoreHorizontal } from "lucide-react";
import { DeletePostBtn } from ".";
import Link from "next/link";

export const PostOptions = ({post, userId}: any) => {

    const isPostOwner = post.author.id == userId;

  return (
    <>
    <Dialog>
        <DialogTrigger>
            <MoreHorizontal className="dark:text-neutral-400"/>
        </DialogTrigger>
        <DialogContent className="p-0 dark:bg-neutral-800 rounded-lg">
            <DialogHeader className="" >
            <DialogDescription className="flex flex-col items-center w-full">
                {isPostOwner && (
                <>
                    <DeletePostBtn postId={post.id}/>
                    <Link href={`/post/${post.id}/edit`}
                    className="optionsBtn"
                    title="Edit Post"
                    >
                        Edit
                    </Link>  
                </>
                )}

                <div className="optionsBtn border-none">
                    Hide like counts
                </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
    </>
  )
}
