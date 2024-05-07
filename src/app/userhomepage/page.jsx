'use client'
import React, { useRef, useState, useEffect } from 'react'
//import * as faceapi from '../../app/userhomepage/face-api.min.js'
import FaceDetection from './facedetection';
import { isAuthenticated } from '../utils/auth';
import {useRouter} from 'next/navigation';
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
    <div className='flex min-h-1 flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8'>Facial Recognition
    
        <h1>Camera Capturing Facial Expressions</h1>
       <FaceDetection/>
    
    </div>
    </div>
  ): null;
}
