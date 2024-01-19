"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/button'
import { useTheme } from 'next-themes'

export const Logo = () => {

    const {theme} = useTheme();
    
  return (
    <Link href='/' className={
        buttonVariants({
            className: 
                "hidden md:flex navLink !mb-10 lg:hover-bg-tranparent !p-2 ",
            variant: "ghost",
            size: "lg"
        })
    }>
        <div className='max-lg:hidden'>
            <Image src={`${theme == "dark" ? '/logo.svg': '/logo-white.png'}`} alt='instaDS' width={100} height={50}
            className='object-contain dark:w-28 dark:h-20 w-40'
            />
        </div>
        
        <div className='lg:hidden'>
            <Image src={`${theme == "dark" ? '/logo.svg': '/logo-white.png'}`} alt='instaDS' width={100} height={50}
            className='object-contain w-28 h-20'
            />
        </div>
        

    </Link>
  )
}
