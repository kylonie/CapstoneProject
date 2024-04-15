'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { Input, Button } from "@material-tailwind/react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Link from 'next/link';
export default function Login() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const router = useRouter();
    const handleLogin = async (e)=>{
        const auth = getAuth();
        try{
            await signInWithEmailAndPassword(auth, email, password)
            router.push('/userhomepage')
        } catch(error){
            console.log(error);
        }
    }
  return (
    <div className='flex min-h-1 flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <Image src='/logo.jpg' width={400} height={400}></Image>
            <h2 className='text-center text-2xl font-bold text-black'>Sign in to your account</h2>
        </div>

        <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
            <div>
                <label className='mb-2 block text-sm text-black'>Email address</label>
                <Input label='Email address' onChange={(e)=>setEmail(e.target.value)} value={email}></Input>
            </div>
        </div>

        <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
            <div>
                <label className='mb-2 block text-sm text-black'>Password</label>
                <Input label='Password'onChange={(e)=>setPassword(e.target.value)} value={password}></Input>
            </div>
        </div>

        <div className='flex justify-center'>
            <div>
                <Link href='/register'>Register here.</Link>
            </div>
        </div>

        <div className='mt-5 flex justify-center'>
            <div>
                <Button onClick={handleLogin}>Sign In</Button>
            </div>
        </div>

    </div>


  )
}
