import { getAuthSession } from "@/utils/auth"
import { BottomLinks, ProfileLink } from "../helpers"

export const BottomBar = async () => {
    const session = await getAuthSession();
    const user = session?.user
  return (
    <nav className="flex md:hidden fixed bottom-0 px-4 py-2 justify-between left-0 w-screen dark:glassmorphism glassmorphism-dark gap-3">
        <BottomLinks/>
        {user && <ProfileLink user={user}/>}
    </nav>
  )
}
