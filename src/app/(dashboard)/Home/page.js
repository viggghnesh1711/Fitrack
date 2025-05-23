"use client"; 
import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Bottombar from "@/components/Bottombar";
import { motion } from "framer-motion";
import Chart from "@/components/Chart";
import Link from "next/link";
import Calorie from "@/components/Calorie"

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
      <div className="bg-stone-950 min-h-screen w-full px-5 py-5 flex flex-col gap-6 relative pb-32 sm:pl-96 sm:pr-20">
        
        {/* Navbar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="w-full flex justify-between items-center"
        >
          <Navbar />
        </motion.div>
              
        {/* Chart */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="shadow-lg shadow-stone-900 h-[250px] sm:h-[300px] w-full rounded-2xl bg-stone-900" // Set specific height for the chart
        >
          <Chart />
        </motion.div>
      
        {/* Calendar and Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5 mt-5"
        >
          <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, type: "spring" } },
      }}
      initial="hidden"
      animate="visible"
      className="flex justify-center w-full"
    >
      <div className="rounded-2xl w-full bg-stone-900 text-stone-300 border-none shadow-lg p-4">
        <Calendar mode="single" selected={dateOne} onSelect={onDateSelect} />
      </div>
    </motion.div>

                   
           
        </motion.div>

        {/* Bottom Bar */}
        <div>
          <Bottombar />
        </div>
      </div>
    </>
  );
};

export default Page;
