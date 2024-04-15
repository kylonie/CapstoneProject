'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Input, Button } from "@material-tailwind/react";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
export default function Register() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const router = useRouter();
    const handleRegister = async (e)=>{
        const auth = getAuth();
        try{
            setEmail('');
            setPassword('');
            await createUserWithEmailAndPassword(auth, email, password)
            router.push('/login')
        } catch(error){
            console.log(error);
        }
    }
  return (
    <div className='flex min-h-1 flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <Image src='/logo.jpg' width={400} height={400}></Image>
            <h2 className='text-center text-2xl font-bold text-black'>Register an account.</h2>
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

        <div className='mt-2 flex justify-center'>
            <div>
                <Link href='/login'>Sign in here.</Link>
            </div>
        </div>

        <div className='mt-5 flex justify-center'>
            <div>
                <Button onClick={handleRegister}>Sign Up</Button>
            </div>
        </div>

    </div>


  )
}
