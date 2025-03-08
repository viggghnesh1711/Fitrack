"use client"
import { AsyncCallbackSet } from 'next/dist/server/lib/async-callback-set';
import Link from 'next/link'
import React, { useState } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { RiFeedbackFill } from "react-icons/ri";
import { motion } from "framer-motion";
import Delete from "@/components/Delete"
import Logout from "@/components/Logout"
import { MdCancel } from "react-icons/md";

const Settings = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [show, setShow] = useState(false);

  return (
    <div className='w-full py-10 '>
        <h1 className='text-stone-500 text-sm '>GENERAL</h1>
        <div className='w-full py-5 space-y-3'>
            <Link href='/Account' className='text-stone-400 py-2 flex justify-between items-center'>
            <div className='flex gap-5 items-center'>
            <FaUserAlt className='text-lg'/>
            <h1 className='text-lg'> Account</h1>
            </div>
            <IoIosArrowForward className='text-lg'/>
            </Link>

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
            onClick={()=>{setShow(true)}}
            href='' className='text-stone-400 py-2 flex justify-between items-center'>
            <div className='flex gap-5 items-center'>
            <MdDelete className='text-xl'/>
            <h1 className='text-lg'> Delete</h1>
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
            <h2 className="text-lg font-semibold mb-4 text-stone-400">Confirm Delete</h2>
            <button onClick={() => setShow(false)} className="">
                < MdCancel className='text-2xl text-stone-300'/>
               </button>
            </div>
            <Delete/>
           
           </motion.div>
         </div>
        )}

        </div>
       
        <h1 className='text-stone-500 text-sm '>SUPPORT</h1>
        <div className='w-full py-5 space-y-3'>
            <Link href='' className='text-stone-400 py-2 flex justify-between items-center'>
            <div className='flex gap-5 items-center'>
            <RiFeedbackFill className='text-lg'/>
            <h1 className='text-xl'> Feedback</h1>
            </div>
            <IoIosArrowForward className='text-lg'/>
            </Link>
            
         
           
        </div>
    </div>
  )
}

export default Settings