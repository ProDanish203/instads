"use client"
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const links = [
    {
        name: "home",
        path: '/', 
        icon: 'fas fa-home'
    },
    {
        name: "explore",
        path: '/explore', 
        icon: 'far fa-compass',
    },
    {
        name: "Notifications",
        path: '/notifications', 
        icon: 'far fa-heart',
    },
    {
        name: "Create",
        path: '/create', 
        icon: 'far fa-square-plus',
    },
]

export const BottomBar = () => {

    const pathname = usePathname();

  return (
    <nav className="flex md:hidden fixed bottom-0 px-4 py-2 justify-between left-0 w-screen dark:glassmorphism glassmorphism-dark gap-3">
    {links.map((link, i:number) => {
        const isActive = pathname.includes(link.path);
        return <Link href={link.path} key={i} 
        className={buttonVariants({
            variant: isActive ? "secondary" :"ghost"  ,
            className: cn("navLink", {"dark:!bg-neutral-900 !bg-neutral-300": isActive}),
            size: "lg"
        })}
        >   
          <i className={`${link.icon} text-lg`}></i>
        </Link>
    }
    )}
    </nav>
  )
}
