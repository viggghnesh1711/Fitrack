import Bottombar from '@/components/Bottombar'
import Navbar from '@/components/Navbar'
import React from 'react'
import { motion } from "framer-motion";
import Chatbot from '@/components/Chatbot';

const page = () => {
  return (
    <div className='bg-stone-950 px-5 py-5 w-full min-h-screen overflow-x-hidden'>
        <Navbar/>
        <Chatbot/>

        <div className='absolute right-0 left-0 bottom-0'>
        <Bottombar/>
        </div>
        
         </div>
  )
}

export default page