'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { Alert, Input, Button, Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Link from 'next/link';
export default function Login() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[open, setOpen] = useState(true);
    const[error, setError] = useState(null);
    const router = useRouter();
    const handleLogin = async (e)=>{
    const auth = getAuth();
        try{
            await signInWithEmailAndPassword(auth, email, password)
            router.push('/userhomepage')
        } catch(error){
            setError(error.message);
            setOpen(true);
            setEmail('');
            setPassword('');
        }
    }
  return (
    <div className='flex min-h-1 flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8'>

    {error && (<Alert className="rounded-none border-l-4 border-[#e53935] bg-[#263238]/10 font-medium text-[#e53935] mb-10"
    open={open} onClose={() => setOpen(false)} >It seems that your credentials are invalid.</Alert>)}

        <Card className="w-96">

            <CardHeader variant="gradient" color="white" className="flex justify-center grid h-auto place-items-center shadow-none">
                <Image src="/VibeCap_Logo_Login.png" width={190} height={190} alt='Logo'/>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">
                <Typography variant='h5' color="blue-gray" className="flex justify-center">Log into your account</Typography>
                 <Typography variant='small' color="gray" className="flex justify-center font-normal">Enter your credentials to continue.</Typography>
                <Input label="Email" type='email' autoComplete='email' autoFocus='true' required color='light-blue' size="lg" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <Input label="Password" type='password' required color='light-blue' size="lg" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            </CardBody>

            <CardFooter className="pt-0">
                <Button variant="gradient" color='light-blue' fullWidth onClick={handleLogin}>Log In</Button>
                <Typography variant="small" className="mt-6 flex justify-center" color='blue-gray'>Don&apos;t have an account?
                <Link href="/register" variant="small" color="blue-gray" className="ml-1 font-bold">Register here</Link>
                </Typography>
            </CardFooter>

        </Card>
    </div>

  )
}
