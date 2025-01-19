'use client'; 
import { FaGoogle } from "react-icons/fa";
import { signIn } from 'next-auth/react';
import { motion } from "framer-motion";

const GoogleSignInButton = () => {
  return (
    <motion.button 
    whileHover={{ scale: 1.05 }} // Scale up on hover
    whileTap={{ scale: 1.05 }}
      onClick={() => signIn('google')} 
      className="w-full py-3 flex items-center justify-center gap-2 bg-stone-300 text-stone-900 rounded-lg hover:bg-stone-400 transition">
       <FaGoogle/>
        Continue with Google
    </motion.button>
  );
};

export default GoogleSignInButton;