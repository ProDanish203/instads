"use client"
import { ChangeEvent, FormEvent, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


interface UserData {
    username: string;
    password: string;
}

export const LoginForm = () => {
    
    const [userData, setUserData] = useState<UserData>({
        username: '',
        password: '',
    }); 

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({...prev, [name]: value }));
      };

    const handleLogin = async (e:FormEvent) => {
        e.preventDefault();
        try{
            setLoading(true);
            const {username, password} = userData
            signIn("credentials", {
                username, password,
                redirect: false
            }).then(({ ok, error}:any) => {
                if(ok){
                router.push('/')
                }else{
                  console.log(error);
                }
            });
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className="max-w-[400px] w-full">
        <form onSubmit={handleLogin}
        className="rounded-md w-full dark:bg-neutral-800 bg-neutral-300 p-5 flex flex-col items-center gap-4"
        >
            <h2 className="text-center text-4xl font-bold mb-2">Login</h2>
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
                className="dark:!bg-neutral-900 dark:hover:!bg-neutral-950 !bg-neutral-400 hover:!bg-neutral-500 font-semibold text-lg !cursor-pointer"
                type="submit"
                disabled={loading}
                >
                    Log in
                </Button>
            </div>

            <p className='capitalize'>Don't have an account?  
            <Link href="/signup" className='underline cursor-pointer font-bold'> Signup</Link>
            </p>
        </form>
    </div>
  )
}
