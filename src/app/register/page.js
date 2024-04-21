'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Alert, Input, Button, Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
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
    <div className='flex min-h-1 flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8'>
        <Card className="w-96">

            <CardHeader variant="gradient" color="blue-gray" className="flex justify-center grid h-28 place-items-center">
                <Typography variant="h3" color="white">Register</Typography>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">
                <Typography variant='small' color="blue-gray" className="flex justify-center mt-1 font-normal">Nice to meet you! Enter your details to register.</Typography>
                <Input label="Email" type='email' color='blue-gray' size="lg" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <Input label="Password" type='password' color='blue-gray' size="lg" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            </CardBody>


            <CardFooter className="pt-0">
                <Button variant="gradient" color='blue-gray' fullWidth onClick={handleRegister}>Register</Button>
                <Typography variant="small" color='blue-gray' className="mt-6 flex justify-center">Already have an account?
                <Link href="/login" variant="small" className="ml-1 font-bold">Sign In here</Link>
                </Typography>
            </CardFooter>

        </Card>
    </div>

  )
}
