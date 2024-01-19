"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { registerUser } from '@/lib/actions/User';

interface UserData {
  username: string;
  password: string;
  email: string;
  name: string;
}

export const SignupForm = () => {
  const [userData, setUserData] = useState<UserData>({
    username: '',
    password: '',
    email: '',
    name: '',
  }); 

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserData(prev => ({...prev, [name]: value }));
    };

  const handleLogin = async (e:FormEvent) => {
      e.preventDefault();
      try{
        setLoading(true);
        const {username, name, password, email} = userData;
        const {user, success, message} = await registerUser({email,username,name,password});

        if(!success) console.log(message);
        console.log(user);

      }catch(error){
          console.log(error);
      }finally{
          setLoading(false);
      }
  }

  return (
  <div className="max-w-[400px] w-full">
      <form onSubmit={handleLogin}
      className="rounded-md w-full dark:bg-neutral-800 bg-neutral-300 p-5 flex flex-col items-center gap-2"
      >
          <h2 className="text-center text-4xl font-bold mb-2">Signup</h2>

          <div className="grid w-full max-w-sm mx-auto items-center gap-1.5">
              <label htmlFor="name">Name</label>
              <Input type="text" id="name" placeholder="Name" name="name" value={userData.name} onChange={handleChange} autoComplete="off" className="!outline-none w-full dark:!bg-neutral-900" />
          </div>

          <div className="grid w-full max-w-sm mx-auto items-center gap-1.5">
              <label htmlFor="email">Email</label>
              <Input type="email" id="email" placeholder="Email" name="email" value={userData.email} onChange={handleChange} autoComplete="off" className="!outline-none w-full dark:!bg-neutral-900" />
          </div>

          <div className="grid w-full max-w-sm mx-auto items-center gap-1.5">
              <label htmlFor="username">Username</label>
              <Input type="text" id="username" placeholder="Username" name="username" value={userData.username} onChange={handleChange} autoComplete="off" className="!outline-none w-full dark:!bg-neutral-900" />
          </div>

          <div className="grid w-full max-w-sm mx-auto items-center gap-1.5">
              <label htmlFor="password">Password</label>
              <Input type="password" id="password" placeholder="Password" name="password" value={userData.password} onChange={handleChange} autoComplete="off" className="!outline-none w-full dark:!bg-neutral-900" />
          </div>

          <div className="grid w-full max-w-sm mx-auto items-center gap-1.5">
              <Button variant={"ghost"} size={"lg"}
              className="mt-2 dark:!bg-neutral-900 dark:hover:!bg-neutral-950 !bg-neutral-400 font-semibold hover:!bg-neutral-500 text-lg !cursor-pointer"
              type="submit"
              disabled={loading}
              >
                  Sign up
              </Button>
          </div>

          <p className='capitalize'>Already have an account?  
            <Link href="/login" className='underline cursor-pointer font-bold'> Login</Link>
          </p>
      </form>
  </div>
  )
}
