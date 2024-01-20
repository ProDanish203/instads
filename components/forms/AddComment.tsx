"use client"
import { FormEvent, useState } from 'react'
import { toast } from 'sonner';

export const AddComment = () => {

    const [comment, setComment] = useState("");
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(!comment) return toast.error("Text field can't be empty")
        try{

        }catch(error){
            toast.error("something went wrong")
        }
    }

  return (
    <>
    <form onSubmit={handleSubmit} className='border-b-2 border-b-neutral-300 dark:border-b-neutral-800 pb-2 flex items-center justify-between gap-2'>
        <input type="text" placeholder='Add a comment...'
        required autoComplete='off'
        className='bg-transparent text-sm outline-none w-full placeholder:!text-neutral-500'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        />
        {comment && <button type='submit' className='text-sky-500'>post</button>}
        
    </form>
    </>
  )
}
