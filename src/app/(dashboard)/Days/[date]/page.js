import Bottombar from '@/components/Bottombar'
import Excersise from '@/components/Excersise'
import Navbar from '@/components/Navbar'
import WeeklyCalendar from '@/components/WeeklyCalendar'
import React from 'react'

const page = ({params}) => {
  const {date} = params
  return (
    <div className='bg-stone-950 px-5 py-5 w-full min-h-screen sm:pl-96 sm:pr-20 '>
       
        <div className='h-full w-full flex flex-col justify-center items-center py-5'>
        <WeeklyCalendar  params={{ date: date }}/>
        <div className='w-full py-5 '>
          <Excersise date={date}/>
        </div>
        </div>

        <div className='absolute right-0 left-0 bottom-0'>
        <Bottombar/>
        </div>
         </div>
  )
}

export default page
