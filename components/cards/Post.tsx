import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { extractInitials } from '@/utils/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { AddComment } from '../forms'

export const Post = ({data}: any) => {
    
    const info = {
        caption: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, a.",
        media: "/login-img.jpg",
        username: "theonlyadmin",
        userImage: "/dummy-user.png",
        likesCount: 115,
        commentsCount: 12
    }
    const {caption, media, username, userImage, likesCount, commentsCount} = info
  return (
    <div className='flex flex-col gap-2 realtive'>
        {/* Post  Header */}
        <div className='flex items-center justify-between px-2'>
            <div className='flex items-center gap-2'>
                <Link href={`/user/`}>
                    <Avatar className='h-8 w-8'>
                        <AvatarImage src={userImage ? userImage: '/dummy-user.png'} alt={username || ""}/>
                        {/* @ts-ignore */}
                        <AvatarFallback>{extractInitials(username)}</AvatarFallback>
                    </Avatar>
                </Link>
                <Link href={`/user/`} className='text-sm font-semibold'>theonlyadmin</Link>
                <p className='text-sm text-neutral-400'>.4d ago</p>
            </div>

            <div>
                <i className='fas fa-ellipsis cursor-pointer text-lg'></i>
            </div>
        </div>

        <Image src={media} alt={caption || username || ""} width={400} height={500}
        className='w-full h-[550px] rounded-sm mt-1'
        />

        <div className='flex flex-col gap-1'>

            <div className='flex items-center justify-between w-full text-lg'>
                <div className='flex items-center gap-2'>
                    <i className='far fa-heart cursor-pointer'></i>
                    <i className='far fa-comment cursor-pointer'></i>
                    <i className='far fa-paper-plane cursor-pointer'></i>
                </div>

                <div>
                    <i className='far fa-bookmark cursor-pointer'></i>
                </div>
            </div>

            <p className=''>{likesCount} likes</p>
            <p className='text-sm'>
                <Link href={`/user`} className='font-semibold'>theonlyadmin</Link>&nbsp;
                <span>{caption.length < 150 ? caption : (
                    <>
                    {caption.slice(0, 150)}
                    ... <span className='text-neutral-400'>more</span>
                    </>
                )} </span>
            </p>
            {commentsCount > 3 && <p className='text-sm dark:text-neutral-400 text-neutral-600'>View all {commentsCount} comments</p>}
            
            <AddComment/>
        </div>
    </div>
  )
}
