"use client";

import React from "react";
import { HiHome } from "react-icons/hi2";
import { FaCalendarAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import NavbarSidebar from "@/components/NavbarSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMdNotificationsOutline } from "react-icons/io";

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

  const links = [
    { href: "/Home", icon: <HiHome />, label: "Home" },
    { href: `/Days/${formattedDate}`, icon: <FaCalendarAlt />, label: "Add" },
    { href: "/Chat", icon: <FaRobot />, label: "Chat" },
    { href: "/Settings", icon: <IoSettings />, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Bottom Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-stone-800 gap-10 text-4xl text-stone-400 rounded-2xl shadow-xl shadow-stone-900 flex justify-between items-center p-3 m-5 md:hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {links.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col justify-center gap-1 items-center ${
              isActive(href) ? "bg-stone-400 rounded-2xl px-3 text-stone-800" : ""
            }`}
          >
            <span className="text-2xl">{icon}</span>
            <span className="text-xs tracking-tighter">{label}</span>
          </Link>
        ))}
      </motion.div>

      {/* Desktop Sidebar */}
     <motion.div
        className="hidden md:fixed md:top-0 md:left-0 md:h-screen md:w-72 md:flex md:flex-col
         bg-stone-800 shadow-xl shadow-stone-900 px-6 py-6 justify-between sm:w-72"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {/* Top: User Info */}
        <NavbarSidebar />

        

  {/* Navigation Links */}
  <div className="flex flex-col gap-6">
    {links.map(({ href, icon, label }) => (
      <Link
        key={href}
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
          isActive(href)
            ? "bg-stone-400 text-stone-800"
            : "text-stone-400 hover:bg-stone-700"
        }`}
      >
        <span className="text-2xl">{icon}</span>
        <span className="text-lg">{label}</span>
      </Link>
    ))}
  </div>

  <div className="flex items-center justify-between gap-4">

     <Link href="/Account">
     
          <Avatar className="w-12 h-12">
            <AvatarImage src="/images/barbell.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <Link href="/Notifications">
          <IoMdNotificationsOutline className="text-4xl text-stone-300" />
        </Link>
       
      </div>
</motion.div>
    </>
  );
};

export default Bottombar;
