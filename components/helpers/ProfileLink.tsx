import { User } from "next-auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { extractInitials } from "@/utils/helpers";

export const ProfileLink = ({user}: {user: User}) => {

    const {username, name, image, id} = user
  return (
    <Link href={`/user/${id}`} className="navLink !px-2 py-1 rounded-md flex items-center gap-2 sm:mt-5">

        <Avatar>
            <AvatarImage src={image ? "": "/dummy-user.png"} alt={username || ""}/>
            {/* @ts-ignore */}
            <AvatarFallback>{extractInitials(name)}</AvatarFallback>
        </Avatar>
        <div className="max-lg:hidden">
            <p>{name}</p>
            <p className="text-sm text-neutral-500">@{username}</p>
        </div>
    </Link>
  )
}
