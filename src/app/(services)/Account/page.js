"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { RiFeedbackFill } from "react-icons/ri";
import { motion } from "framer-motion";
import Logout from "@/components/Logout"
import { MdCancel } from "react-icons/md";
import Form from "@/components/Form"
import PaymentButton from '@/components/PaymentButton';
import { Button } from 'react-day-picker';
import { Delius } from 'next/font/google';
import Delete from "@/components/Delete"

const page = () => {
  const [user,setuser]=useState('')
  const [showPopup, setShowPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [showing, setShowing] = useState(false);
  const [del, setdel] = useState(false);

  useEffect(()=>{
    const fetchdata =async()=>{
      const response = await fetch('/api/username')
      if(response.ok){
        const result = await response.json();
        setuser(result.username);
      }
    }
    fetchdata()
  },[])

  useEffect(() => {
    if (localStorage.getItem("paymentSuccess")) {
      setShowing(false);
      localStorage.removeItem("paymentSuccess");
    }
  }, []);

  return (
    <div className='w-full h-screen bg-stone-900 text-stone-300 px-5 py-5'>
        <div className='   text-3xl'>
        <Link href='/Home' className='flex items-center gap-2'>
        <IoIosArrowBack/>
       <h1 className='text-base font-bold'>Go Back</h1></Link>
        </div>
        <div className='w-full h-full '>
        <div className='w-full pt-10 py-5 flex flex-col gap-3 justify-center items-center'>
        <Image 
          src="/images/barbell.png"  // Path to the image (could be local or external URL)
          alt="Description of the image"  // Alt text for accessibility
          width={80}  // Width of the image (in pixels)
          height={80}  // Height of the image (in pixels)
        />
        <div className='w-full flex justify-center items-center gap-1'>
        <h1 className='text-sm text-stone-400 font-semibold'>User :</h1>
        <h1 className='text-lg text-stone-300 font-semibold'>{user}</h1>
        </div>
        </div>

        <div className='w-full pb-14'>
        <div className='w-full py-5 space-y-3'>

            <Link 
            onClick={()=>{setShow(true)}}
            href='' className='text-stone-400 py-2 flex justify-between items-center'>
            <div className='flex gap-5 items-center'>
            <FaUserAlt className='text-lg'/>
            <h1 className='text-lg'> Edit Profile</h1>
            </div>
            <IoIosArrowForward className='text-lg'/>
            </Link>
            {show && (
           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 mx-5">
           <motion.div
             initial={{ opacity: 0, scale: 0.8, y: -50 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.8, y: -50 }}
             transition={{ duration: 0.3, ease: "easeInOut" }}
             className="bg-stone-800 p-6 rounded-xl shadow-lg text-center"
           >
            <div className='w-full flex justify-between items-center'>
            <h2 className="text-lg font-semibold mb-4 text-stone-400">Form</h2>
            <button onClick={() => setShow(false)} className="">
                 <MdCancel className='text-xl'/>
               </button>
            </div>
             <p className="text-stone-500 mb-4">
              Make the changes to update profile
             </p>
          <Form/>
           </motion.div>
         </div>
        )}

            <Link href='/Notifications' className='text-stone-400 py-2 flex justify-between items-center'>
            <div className='flex gap-5 items-center'>
            < IoNotifications className='text-xl'/>
            <h1 className='text-lg'> Notifications</h1>
            </div>
            <IoIosArrowForward className='text-lg'/>
            </Link>
            
            <Link 
            onClick={()=>{setShowPopup(true)}}
            href='#' className='text-stone-400 py-2 flex justify-between items-center'>
            <div className='flex gap-5 items-center'>
            <IoLogOutSharp className='text-xl'/>
            <h1 className='text-lg'> Log out</h1>
            </div>
            <IoIosArrowForward className='text-lg'/>
            </Link>
            {showPopup && (
           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 mx-5">
           <motion.div
             initial={{ opacity: 0, scale: 0.8, y: -50 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.8, y: -50 }}
             transition={{ duration: 0.3, ease: "easeInOut" }}
             className="bg-stone-800 p-6 rounded-xl shadow-lg text-center"
           >
             <h2 className="text-lg font-semibold mb-4 text-stone-400">Confirm Logout</h2>
             <p className="text-stone-500 mb-4">
               Are you sure you want to log out? Please confirm if you want to logout.
             </p>
             <div className="flex justify-center gap-4">
               <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-stone-400 rounded-lg">
                 Cancel
               </button>
              <Logout/>
             </div>
           </motion.div>
         </div>
        )}

          <Link 
            onClick={()=>{setdel(true)}}
            href='' className='text-stone-400 py-2 flex justify-between items-center'>
            <div className='flex gap-5 items-center'>
            <MdDelete className='text-xl'/>
            <h1 className='text-lg'> Delete</h1>
            </div>
            <IoIosArrowForward className='text-lg'/>
            </Link>
            {del && (
           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 mx-5">
           <motion.div
             initial={{ opacity: 0, scale: 0.8, y: -50 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.8, y: -50 }}
             transition={{ duration: 0.3, ease: "easeInOut" }}
             className="bg-stone-800 p-6 rounded-xl shadow-lg text-center"
           >
            <div className='w-full flex justify-between items-center'>
            <h2 className="text-lg font-semibold mb-4 text-stone-400">Confirm Delete</h2>
            <button onClick={() => setdel(false)} className="">
                < MdCancel className='text-2xl text-stone-300'/>
               </button>
            </div>
            <Delete/>
           
           </motion.div>
         </div>
        )}
            
        </div>
        </div>

        <div className='w-full bg-stone-800 p-5 rounded-xl space-y-5'>
            <h1 className='text-stone-400 text-center text-sm mb-2'>"Help us improve! Let us know if you like our service by sharing your feedback. Your opinion matters!"</h1>
           
              <button 
                onClick={()=>{setShowing(true)}}
              className='w-full py-2 text-center bg-stone-400 rounded-lg font-semibold'>Subscribe </button>
              {showing && (
           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
           <motion.div
             initial={{ opacity: 0, scale: 0.8, y: -50 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.8, y: -50 }}
             transition={{ duration: 0.3, ease: "easeInOut" }}
             className="bg-stone-800 p-6 rounded-xl shadow-lg text-center">
               <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-4 text-stone-400">Support Us</h2>
        <button onClick={() => setShowing(false)} className="">
        < MdCancel/>
               </button>
       
        </div>
               <PaymentButton/>
           </motion.div>
         </div>
        )}
           
            
            </div>
        </div>

      </div>
  )
}

export default page