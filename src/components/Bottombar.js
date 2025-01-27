"use client";

import React from "react";
import { HiHome } from "react-icons/hi2";
import { FaCalendarAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Bottombar = () => {
  const pathname = usePathname();

  const getCurrentFormattedDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = currentDate.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const year = currentDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedDate = getCurrentFormattedDate();

  const isActive = (path) => {
    if (path.startsWith("/Days/")) {
      return pathname.startsWith("/Days/");
    }
    return pathname === path;
  };


  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-stone-800 gap-10 text-4xl text-stone-400 rounded-2xl shadow-xl shadow-stone-900 flex justify-between items-center p-3 m-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Link
          href="/Home"
          className={`flex flex-col justify-center gap-1 items-center ${
            isActive("/Home") ? "bg-stone-400 rounded-2xl px-3 text-stone-800" : ""
          }`}
        >
          <HiHome className="text-2xl" />
          <h1 className="text-xs tracking-tighter">Home</h1>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Link
          href={`/Days/${formattedDate}`}
          className={`flex flex-col gap-1 justify-center items-center ${
            isActive(`/Days/`) ? "bg-stone-400 rounded-2xl px-3 text-stone-800" : ""
          }`}
        >
          <FaCalendarAlt className="text-2xl" />
          <h1 className="text-xs tracking-tighter">Add</h1>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Link
          href="/Chat"
          className={`flex flex-col gap-1 justify-center items-center ${
            isActive("/Chat") ? "bg-stone-400 rounded-2xl px-3 text-stone-800" : ""
          }`}
        >
          <FaRobot className="text-2xl" />
          <h1 className="text-xs tracking-tighter">Chat</h1>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Link
          href="/Settings"
          className={`flex flex-col gap-1 justify-center items-center ${
            isActive("/Settings") ? "bg-stone-400 rounded-2xl px-3 text-stone-800" : ""
          }`}
        >
          <IoSettings className="text-2xl tracking-tighter" />
          <h1 className="text-xs">Settings</h1>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Bottombar;
