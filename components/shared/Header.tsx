import React from 'react'

interface Props{
  back?: boolean;
  title: string;
}

export const Header = ({back, title}: Props) => {
  return (
    <div className='sm:hidden fixed top-0 left-0 px-2 flex items-center justify-between py-2 w-full dark:bg-neutral-950 bg-white shadow-sm border-b-2'>
      <div className='flex items-center gap-2'>
        {back && (
          <i className='fas fa-arrow-left cursor-pointer'></i>
        )}
        <h2 className='text-lg font-bold'>{title}</h2>
      </div>

      <div className='flex items-center gap-2 py-2 px-2 rounded-lg dark:bg-neutral-900 bg-neutral-200 shadow-md'>
        <i className='fas fa-magnifying-glass text-sm'></i>
        <input type="search" placeholder='Search' 
        className='placeholder:text-neutral-500 text-md outline-none border-none bg-transparent'
        />
      </div>
    </div>
  )
}
