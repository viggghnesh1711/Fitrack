"use client";
import { useState } from "react";
import { RiFeedbackFill } from "react-icons/ri";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { MdPrivacyTip, MdCopyright } from "react-icons/md";
import { motion } from "framer-motion";
import { FaUserAlt } from "react-icons/fa";
import Link from "next/link";

export default function SettingsPage() {
  const [openSection, setOpenSection] = useState("feedback");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleFeedbackClick = () => {
    window.location.href = "https://wa.me/918850192746";
  };

  return (
    <div className="w-full py-5 space-y-3">
      <h1 className="pt-5 text-stone-500 text-xs sm:text-base">SETTINGS</h1>

      <div className="cursor-pointer">
        <div className="text-stone-400 py-2 flex justify-between items-center">
          <Link href="/Account">
          <div className="flex gap-5 items-center">
            <FaUserAlt className="text-sm sm:text-xl" />
            <h1 className="text-lg sm:text-xl">Profile & Accont</h1>
          </div>
      </Link>
        </div>

      </div>

      {/* Terms & Conditions */}
      <div onClick={() => toggleSection("terms")} className="cursor-pointer">
        <div className="text-stone-400 py-2 flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <RiFeedbackFill className="text-sm sm:text-xl" />
            <h1 className="text-lg sm:text-xl">Terms & Conditions</h1>
          </div>
          {openSection === "terms" ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </div>
        {openSection === "terms" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-stone-800 rounded-lg">
            <p className="text-stone-400 text-sm">Review our terms and conditions for using our services. By accessing or using our platform, you agree to be bound by our policies, including user conduct guidelines, intellectual property rights, and liability limitations.</p>
          </motion.div>
        )}
      </div>

      {/* Privacy Policy */}
      <div onClick={() => toggleSection("privacy")} className="cursor-pointer">
        <div className="text-stone-400 py-2 flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <MdPrivacyTip className="text-sm sm:text-xl" />
            <h1 className="text-lg sm:text-xl">Privacy Policy</h1>
          </div>
          {openSection === "privacy" ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </div>
        {openSection === "privacy" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-stone-800 rounded-lg">
            <p className="text-stone-400 text-sm">Learn how we protect and use your personal information. We are committed to ensuring your privacy and safeguarding any data shared with us, in compliance with global data protection regulations.</p>
          </motion.div>
        )}
      </div>

      {/* Copyright Notice */}
      <div onClick={() => toggleSection("copyright")} className="cursor-pointer">
        <div className="text-stone-400 py-2 flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <MdCopyright className="text-sm sm:text-xl" />
            <h1 className="text-lg sm:text-xl">Copyright Notice</h1>
          </div>
          {openSection === "copyright" ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </div>
        {openSection === "copyright" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-stone-800 rounded-lg">
            <p className="text-stone-400 text-sm">All rights reserved. Unauthorized use, reproduction, or distribution of our content without prior permission is strictly prohibited.
              @vighneshkachare0059@gmail.com
            </p>
          </motion.div>
        )}
      </div>

      {/* Feedback Section */}
      <div onClick={() => toggleSection("feedback")} className="cursor-pointer">
        <div className="text-stone-400 py-2 flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <RiFeedbackFill className="text-sm sm:text-xl" />
            <h1 className="text-lg sm:text-xl">Feedback</h1>
          </div>
          {openSection === "feedback" ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </div>

        {openSection === "feedback" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 sm:py-8 bg-stone-800 rounded-lg sm:mt-32">
            <p className="text-stone-400 text-sm sm:text-lg">For feedback, please contact us via WhatsApp.</p>
            <button 
              onClick={handleFeedbackClick} 
              className="mt-2 px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-600 text-sm sm:text-lg"
            >
              Contact on WhatsApp
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
