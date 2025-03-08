import React from 'react'
import { IoIosArrowBack } from "react-icons/io";

const page = () => {
  return (
    <div className='h-screen w-full bg-stone-950 px-5 py-5 '>
        <div className=' py-2 '>
            <div className='flex gap-2 items-center'>
                <IoIosArrowBack className='text-stone-500 text-xl'/>
            <h1 className='text-xl text-stone-500'>Back</h1>
            </div>
            
        </div>
        </div>
  )
}

export default page