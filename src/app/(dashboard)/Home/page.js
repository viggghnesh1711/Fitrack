"use client"; 
import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Bottombar from "@/components/Bottombar";
import { motion } from "framer-motion";

const Page = () => {
  const router = useRouter();
  const [dateOne, setDate] = useState(new Date());

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const onDateSelect = (selectedDate) => {
    setDate(selectedDate);
    router.push(`/Days/${formatDate(selectedDate)}`);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2, // Delay between child animations
        type: "spring",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="bg-stone-950 h-screen w-full px-5 py-5 flex flex-col gap-6 relative">
        
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="w-full flex justify-between items-center"
        >
          <Navbar />
        </motion.div>
        
      
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="shadow-lg shadow-stone-900 h-40 w-full rounded-2xl bg-stone-900"
        ></motion.div>
        
    
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className=""
        >
          <motion.div
            variants={itemVariants}
            className="rounded-2xl w-full bg-stone-900 text-stone-300 border-none shadow-lg shadow-stone-900"
          >
            <Calendar
              mode="single"
              selected={dateOne}
              onSelect={onDateSelect}
              modifiersStyles={{
                today: {
                  backgroundColor: "gray",
                  color: "black",
                },
              }}
            />
          </motion.div>

          <motion.div className="flex gap-5 pt-5">
            {/* Left Card */}
            <motion.div
              variants={itemVariants}
              className="shadow-lg shadow-stone-900 h-44 w-full bg-stone-900 rounded-2xl"
            ></motion.div>
            {/* Right Card */}
            <motion.div
              variants={itemVariants}
              className="shadow-lg shadow-stone-900 h-44 w-full bg-stone-900 rounded-2xl"
            ></motion.div>
          </motion.div>
        </motion.div>

        <div
        >
          <Bottombar />
        </div>
      </div>
    </>
  );
};

export default Page;
