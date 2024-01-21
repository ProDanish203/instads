import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AddComment } from '../forms'
import { formatDistanceToNowStrict } from 'date-fns'
import { PostOptions } from '../helpers'
import { getAuthSession } from '@/utils/auth'
import { LikeBtn } from '../helpers/LikeBtn'

export const Post = async ({data}: any) => {

    const {id, image, author, caption, likes, comments, createdAt} = data;
    const formattedDate = formatDistanceToNowStrict(new Date(createdAt));

    const session = await getAuthSession();
    const user = session?.user;

  return (
    <div className='flex flex-col gap-2 realtive'>
        {/* Post  Header */}
        <div className='flex items-center justify-between px-2'>
            <div className='flex items-center gap-2'>
                <Link href={`/user/${author.id}`}>
                    <Image src={author.image ? author.image: '/dummy-user.png'} alt={author.username} width={50} height={50} 
                    className='w-8 h-8 rounded-full'
                    />
                </Link>
                <Link href={`/user/${author.id}`} className='text-sm font-semibold'>{author.username}</Link>
                <p className='text-sm text-neutral-400'>{formattedDate} ago</p>
            </div>
            {user && <PostOptions post={data} userId={user.id}/>}
        </div>

        <Image src={image} alt={caption.slice(0,50) || author.username || ""} width={1400} height={1500}
        className='w-full h-[550px] object-cover rounded-sm mt-1'
        />

        {/* Post Actions */}
        <div className='flex flex-col gap-1'>

            <div className='flex items-center justify-between w-full text-lg'>
                <div className='flex items-center gap-2'>
                    <LikeBtn postId={id} likes={likes}/>
                    <i className='far fa-comment cursor-pointer'></i>
                    <i className='far fa-paper-plane cursor-pointer'></i>
                </div>

                <div>
                    <i className='far fa-bookmark cursor-pointer'></i>
                </div>
            </div>

            <p className=''>{likes.length} likes</p>
            <p className='text-sm'>
                <Link href={`/user/${author.username}`} className='font-semibold'>{author.username}</Link>&nbsp;
                <span>{caption.length < 150 ? caption : (
                    <>
                    {caption.slice(0, 150)}
                    ... <span className='text-neutral-400'>more</span>
                    </>
                )} </span>
            </p>
            {comments.length > 3 && <p className='text-sm dark:text-neutral-400 text-neutral-600'>View all {comments} comments</p>}
            
            <AddComment/>
        </div>
    </div>
  )
}
