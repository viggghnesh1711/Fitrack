"use client";
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

const Verificationcode = ({ gmail }) => {
    const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join(''); 

    try {
      const response = await fetch('/api/verifyemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode,email:gmail }),
      });

      if (response.ok) {
        const result = await response.json();
        if(result.stat){
            toast.success(result.message);
            router.push('/User-Details');
        }
        else{
            toast.error(result.message);
        }
      } else {
        const result = await response.json();
        toast.error(result.message);
        router.push('/Sign-Up');
      }
    } catch (error) {
        router.push('/Sign-Up');
      console.error('Error verifying code:', error);
      toast.error('Something went wrong while verifying the code.');
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow numeric input
    if (value === '' || /^[0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Focus next input if current input is filled
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && code[index] === '') {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <Toaster/>
      <motion.form
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
        className="bg-stone-800 p-6 py-10 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-5 "
      >
        <div className="space-y-2">
          <h2 className="text-xl font-medium text-stone-200">Enter Verification Code</h2>
          <p className="text-sm font-medium text-stone-300">
            A verification code has been sent to the <span className="font-semibold">{gmail}</span>
          </p>
        </div>
        <div className="flex justify-between gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="number"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg bg-stone-700 text-stone-100 border rounded-xl border-stone-600 focus:ring-2 focus:ring-stone-500 focus:outline-none placeholder-stone-500"
              placeholder="—"
            />
          ))}
        </div>
        <motion.button
         whileHover={{ scale: 1.05 }} // Scale up on hover
         whileTap={{ scale: 1.05 }}
          type="submit"
          className="mt-4 w-full py-2 text-stone-900 bg-stone-300 rounded-lg hover:bg-stone-500 transition font-medium"
        >
          Verify Code
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Verificationcode;
