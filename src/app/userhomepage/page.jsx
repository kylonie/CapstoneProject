'use client'
import React, { useRef, useState, useEffect } from 'react'
//import * as faceapi from '../../app/userhomepage/face-api.min.js'
import FaceDetection from './facedetection';
import { isAuthenticated } from '../utils/auth';
import {useRouter} from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import NavbarComponent from './navbar';
export default function UserHomepage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authorized = await isAuthenticated();
      setIsAuthorized(authorized);
      if(!authorized) {
        router.push("/")
      }
    };
    checkAuth();
  },[]);


  return isAuthorized?(
    <div className='bg-blue-gray-50 min-h-screen'>
      <NavbarComponent/>
        <div className='flex min-h-1 flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8'>

        <Card className="w-100">

            <CardHeader variant="gradient" color="white" className="flex justify-center grid h-auto place-items-center shadow-none mt-4">
                <Typography variant='h5' color='blue-gray'>Facial Recognition Module (Camera)</Typography>
            </CardHeader>
            
            <CardBody className="flex flex-col gap-8">
                <FaceDetection/>
            </CardBody>
        </Card>
    
    </div>
    </div>
  ): null;
}
