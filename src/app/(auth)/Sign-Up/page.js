"use client"
import GoogleSignInButton from '@/components/GoogleSignInButton';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import userVerificationSchema from '@/app/schemas/userverification';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import Verificationcode from '@/components/Verificationcode';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter
  const [gmail, setGmail] = useState(''); 
  const [showPassword, setShowPassword] = useState(false); 
  const [verificationSent, setVerificationSent] = useState(false);
  const {register,handleSubmit,formState: { errors },} = useForm({
        resolver: zodResolver( userVerificationSchema), 
    });

    const onSubmit = async (data) => {
      setGmail(data.email)
      
        try {
          const response = await fetch('/api/emailsend', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          if (response.ok) {
            const result = await response.json();
            if(result.stat){
              toast.success(result.message)
              setVerificationSent(true);

              console.log(gmail)
            }
            else{
              toast.error(result.message)
            }
           
          } 
          else {
            const result = await response.json();
            toast.error(result.message) 
          }
        } 
        catch (error) {
          console.error('Error submitting form:', error);
          alert('Something went wrong while submitting the form.');
        }
    };


  return (
    <>
    <div className="flex min-h-screen items-center justify-center bg-stone-900">
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
      <div className="w-full max-w-md p-8 ">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-stone-100">
            Let's Get Started 
          </h1>
          <p className="mt-2 text-stone-400">
            Create your account to explore more.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-200 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-100 border border-stone-600 focus:ring-2 focus:ring-stone-500 focus:outline-none placeholder-stone-500"
              placeholder="example@example.com"
            />
           {errors.email && <p className='text-red-700'>{errors.email.message}</p>}
          </div>

          <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-stone-200 mb-1" >
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          {...register('password')}
          className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-100 border border-stone-600 focus:ring-2 focus:ring-stone-500 focus:outline-none placeholder-stone-500"
          placeholder="********"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute text-xl right-3 top-1/2 transform -translate-y-1/2 text-stone-400 ">
          {showPassword ? (< FaRegEye/>) : (<FaRegEyeSlash/>)}
        </button>
      </div>
      {errors.password && <p className='text-red-700'>{errors.password.message}</p>}
         </div>

          <motion.button
           whileHover={{ scale: 1.05 }} 
           whileTap={{ scale: 1.05 }} 
            type="submit"
            className="w-full py-3 text-stone-100 bg-stone-600 rounded-lg hover:bg-stone-500 transition font-medium">
            Create Account
          </motion.button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-stone-600"></div>
          <span className="px-4 text-sm text-stone-400">or</span>
          <div className="flex-grow h-px bg-stone-600"></div>
        </div>

        {verificationSent ? (
          <Verificationcode gmail={gmail}/>
        ) : null}

        <GoogleSignInButton/>

        <p className="text-center text-stone-400 mt-8">
          Already have an account?{' '}
          <a href="" className="text-stone-200 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
    </>
  )
}

export default page