"use client"
import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const Delete = () => {
    const [email, setemail] = useState("");

    const handleHeightChange = (e) => {
        const value = e.target.value
          setemail(value)
      }
    const handleLogout =async()=>{
        const reponse = await fetch('/api/deleteuser',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({email})
        })
        console.log(email)
    }
  return (
    <div className='w-full h-full '>
            <p className="text-stone-500 mb-4">
               Are you sure you want to Delete account? Please confirm if you want to delete.
             </p>
             <form onSubmit={handleLogout} className='flex flex-col gap-4 '>
                  <div className="space-y-2">
                            <Label htmlFor="height" className="text-stone-400">Confirm your Email</Label>
                            <Input
                            id="height"
                            type="text"
                            value={email}
                            onChange={handleHeightChange}  // Event handler fixed
                            placeholder="Enter your height"
                                className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-100 border border-stone-600 focus:ring-2 focus:ring-stone-500 focus:outline-none placeholder-stone-500"
                            />
                          </div>
                <input 
                type='submit'
                value="Delete"
                className='bg-red-700 px-4 py-2 rounded-lg w-full text-white'
                ></input>

             </form>
           

            
    </div>
  )
}

export default Delete