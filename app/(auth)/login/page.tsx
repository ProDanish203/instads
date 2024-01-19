import { LoginForm } from '@/components/forms'
import Image from 'next/image'
import React from 'react'

const Login = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-screen'>
      <div className='md:col-span-1 md:block hidden'>
        <Image
          width={500}
          height={500}
          className='object-cover w-full h-full'
          src='/login-img.jpg'
          alt='Your Image'
        />
      </div>

      <div className='md:col-span-1 flex items-center justify-center flex-col gap-y-5'>
        <h2 className='md:text-5xl text-3xl font-extrabold'>INSTADS</h2>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login