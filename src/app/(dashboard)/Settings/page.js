import Bottombar from '@/components/Bottombar'
import Navbar from '@/components/Navbar'
import Settings from '@/components/Settings'
import React from 'react'

const page = () => {
  return (
    <div className='bg-stone-950 px-5 py-5 w-full min-h-screen sm:pl-96 sm:pr-20'>
        <Navbar/>
        <div className='h-full w-full flex justify-center items-center '>
        <Settings/>
        </div>
        <div className='absolute right-0 left-0 bottom-0'>
        <Bottombar/>
        </div>
        
         </div>
  )
}

export default page