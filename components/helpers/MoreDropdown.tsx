"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Switch } from "../ui/switch"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export const MoreDropdown = () => {

    const [open, setOpen] = useState(false);
    const [showModeToggle, setShowModeToggle] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const {theme, setTheme} = useTheme();

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) =>{
            if(!e.target) return;
            if(ref.current && !ref.current.contains(e.target as Node)){
                setShowModeToggle(false);
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [ref]);

    const router = useRouter();
    const handleLogout = async () => {
        await signOut();
        router.push("/login");
    }

  return (
    <DropdownMenu
    open={open}
    >
        <DropdownMenuTrigger asChild className="!w-full">
        <Button
        onClick={() => setOpen(prev => !prev)} 
        variant={'ghost'}
        size={'lg'}
        className={cn("navLink hover:!bg-neutral-300 dark:hover:!bg-neutral-900 w-full !outline-none")}
        >   
            <i className={`fas fa-bars text-xl`}></i>
            <p className={`${cn("hidden lg:block text-[17px] capitalize")}`}>More</p>
        </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent ref={ref}
        className={cn("dark:bg-neutral-900 bg-neutral-200 w-60 !rounded-xl !p-0 ml-1 transition-opacity")}
        align="end"
        alignOffset={40}
        >
        {!showModeToggle && (
        <>
            <DropdownMenuItem className="menuLink-container">
                <DropdownMenuLabel className="menuLink lg:text-[16px]">
                    <i className="fas fa-gear"></i>
                    Settings
                </DropdownMenuLabel>
            </DropdownMenuItem>

            <DropdownMenuItem className="menuLink-container" onClick={() => setShowModeToggle(true)}>
                <DropdownMenuLabel className="menuLink lg:text-[16px]">
                    <i className="fas fa-moon"></i>
                    Switch Appearance
                </DropdownMenuLabel>
            </DropdownMenuItem>

            
            <DropdownMenuSeparator />
            <DropdownMenuItem className="menuLink-container"
            onClick={handleLogout}
            >
                <DropdownMenuLabel className="menuLink lg:text-[16px]">
                    <i className="fas fa-right-from-bracket"></i>
                    Logout
                </DropdownMenuLabel>
            </DropdownMenuItem>
        </>
        )}

        {showModeToggle && (
        <>    
        <DropdownMenuItem className="menuLink-container">
            <DropdownMenuLabel className="menuLink lg:text-[15px] flex items-center justify-between w-full">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <i className="fas fa-angle-left cursor-pointer"
                        onClick={() => setShowModeToggle(false)}
                        ></i>
                        <p className="text-md">Switch Appearance</p>
                    </div>
                    <i className={`fas ${theme == "dark" ? "fa-moon": "fa-sun"}`}></i>
                </div>
                
            </DropdownMenuLabel>
        </DropdownMenuItem >
        <DropdownMenuSeparator/>
        <DropdownMenuItem className="menuLink-container">
            <DropdownMenuLabel className="flex w-full items-center font-medium gap-2 lg:text-[15px]">
                <label htmlFor="toggleMode" className="flex items-center justify-between w-full text-md cursor-pointer">
                    Dark Mode
                    <Switch id="toggleMode" 
                    checked={theme == "dark"}
                    onCheckedChange={(checked) => {
                        setTheme(checked ? "dark" : "light")
                    }}
                    className="dark:!bg-neutral-700 !bg-neutral-800"
                    />    
                </label>
                
            </DropdownMenuLabel>
        </DropdownMenuItem>
        
        </>
        )}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
