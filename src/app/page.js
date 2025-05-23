"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const messages = [
  {
    id: 1,
    title: "FitTrack - Grow Together",
    text: "Since yesterday, your fitness stats have improved!",
    image: "/images/one.jpeg",
  },
  {
    id: 2,
    title: "Stay Consistent",
    text: "Regular tracking helps you stay on top of your goals!",
    image: "/images/three.jpeg",
  },
  {
    id: 3,
    title: "Great Progress!",
    text: "You're making steady improvements every day!",
    image: "/images/FRUMMY.jpeg",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Mobile View: full screen */}
      <div className="relative w-full h-screen overflow-hidden md:hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${messages[currentIndex].image})` }}
        ></div>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 to-black">
          <div className="absolute bottom-10 w-full flex flex-col gap-5 justify-center px-5">
            <div className="bg-transparent py-6 rounded-xl max-w-sm transition-opacity duration-500">
              <p className="text-gray-400 text-sm">{messages[currentIndex].title}</p>
              <h1 className="text-white text-3xl font-semibold leading-tight mt-2">
                {messages[currentIndex].text}
              </h1>
            </div>

            {/* Pagination */}
            <div className="flex justify-center space-x-2">
              {messages.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-white w-4" : "bg-gray-500"
                  }`}
                ></div>
              ))}
            </div>

            {/* Buttons */}
            <div className="w-full flex gap-5 justify-center">
              <Link
                href="/Sign-Up"
                className="w-full py-4 text-stone-200 bg-stone-500 rounded-xl flex justify-center items-center font-semibold"
              >
                Sign Up
              </Link>
              <Link
                href="/Sign-In"
                className="w-full py-4 text-stone-400 border-2 border-stone-500 bg-transparent rounded-xl flex justify-center items-center font-semibold"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View: split layout */}
      <div className="hidden md:flex w-full h-screen sm:bg-stone-800">
        {/* Left Half: Image */}
        <div className="w-1/2 h-full relative">
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-1000 sm:rounded-r-3xl"
            style={{ backgroundImage: `url(${messages[currentIndex].image})` }}
          ></div>
        </div>

        {/* Right Half: Text + Buttons */}
        <div className="w-1/2 h-full flex items-center justify-center px-10 sm:bg-stone-800 sm:justify-start">
          <div className=" w-full space-y-6 sm:pr-10 ">
            <p className="text-gray-400 text-sm sm:text-xl">{messages[currentIndex].title}</p>
            <h1 className="text-white text-4xl font-semibold leading-tight sm:text-5xl sm:mb-2">
              {messages[currentIndex].text}
            </h1>

            {/* Pagination */}
            <div className="flex justify-start space-x-2">
              {messages.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-white w-4" : "bg-gray-500"
                  }`}
                ></div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4  sm:gap-10">
              <Link
                href="/Sign-Up"
                className="flex-1 py-4 text-stone-200 bg-stone-500 rounded-xl flex justify-center items-center font-semibold sm:text-xl"
              >
                Sign Up
              </Link>
              <Link
                href="/Sign-In"
                className="flex-1 sm:text-xl py-4 text-stone-400 border-2 border-stone-500 bg-transparent rounded-xl flex justify-center items-center font-semibold"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
