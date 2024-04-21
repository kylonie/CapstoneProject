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

            <CardHeader variant="gradient" color="blue-gray" className="flex justify-center grid h-28 place-items-center">
                <Typography variant="h3" color="white">Login</Typography>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">
                 <Typography variant='small' color="blue-gray" className="flex justify-center mt-1 font-normal">Enter your credentials to continue.</Typography>
                <Input label="Email" type='email' aria-required='true' color='blue-gray' size="lg" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <Input label="Password" type='password' aria-required='true 'color='blue-gray' size="lg" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            </CardBody>


            <CardFooter className="pt-0">
                <Button variant="gradient" color='blue-gray' fullWidth onClick={handleLogin}>Sign In</Button>
                <Typography variant="small" className="mt-6 flex justify-center" color='blue-gray'>Don&apos;t have an account?
                <Link href="/register" variant="small" color="blue-gray" className="ml-1 font-bold">Register here</Link>
                </Typography>
            </CardFooter>

        </Card>
    </div>

  )
}
