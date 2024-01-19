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
        name: "search",
        path: '/search', 
        icon: 'fas fa-magnifying-glass',
        hideOnMobile: true
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

export const NavLinks = () => {

    const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-3">
    {links.map((link, i:number) => {
        const isActive = pathname.includes(link.path);
        return <Link href={link.path} key={i} 
        className={buttonVariants({
            variant: isActive ? "secondary" :"ghost"  ,
            className: cn("navLink", {"hidden md:flex": link.hideOnMobile}),
            size: "lg"
        })}
        >   
            <i className={`${link.icon} text-lg`}></i>
            <p className={`${cn("hidden lg:block text-[17px] capitalize", { "font-extrabold": isActive})}`}>{link.name}</p>
        </Link>
    }
    )}
    </nav>
  )
}
