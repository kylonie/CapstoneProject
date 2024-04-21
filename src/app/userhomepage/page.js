'use client'
import React, { useRef, useState } from 'react'
//import * as faceapi from '../../app/userhomepage/face-api.min.js'
import FaceDetection from './facedetection';

export default function UserHomepage() {
  return (
    <div className='flex min-h-1 flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8'>Homepage
    
        <h1>FaceDetection</h1>
        <FaceDetection/>
    
    </div>
  )
}
