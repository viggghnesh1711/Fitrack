import Bottombar from '@/components/Bottombar'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className='bg-stone-950 px-5 py-5 w-full min-h-screen'>
        <Navbar/>
        <div className='h-full w-full flex justify-center items-center'>
        <h1 className='text-stone-300'>Chat page </h1>
        </div>
        <div className='absolute right-0 left-0 bottom-0'>
        <Bottombar/>
        </div>
        
         </div>
  )
}

export default page