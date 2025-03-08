"use client"
import Link from 'next/link';
import React from 'react'
import { IoIosArrowBack } from "react-icons/io";

const page = () => {
  return (
    <div className='w-full h-screen bg-stone-900 relative  text-stone-300'>
      <div className=' px-5 py-5  text-3xl absolute'>
        <Link href='/Home' className='flex items-center gap-2'>
        <IoIosArrowBack/>
       <h1 className='text-base font-bold'>Go Back</h1></Link> </div>
      <div className='w-full h-full flex justify-center items-center text-xl'>
        
        <h1 className='text-lg font-bold'>"No notifications yet."</h1>
      </div>
     </div>
  )
}

export default page