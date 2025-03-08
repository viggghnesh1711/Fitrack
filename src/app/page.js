"use client"
// import Link from "next/link";
// import { useState, useEffect } from "react";

// const messages = [
//   {
//     id: 1,
//     title: "FitTrack - Grow Together",
//     text: "Since yesterday, your fitness stats have improved!",
//   },
//   {
//     id: 2,
//     title: "Stay Consistent",
//     text: "Regular tracking helps you stay on top of your goals!",
//   },
//   {
//     id: 3,
//     title: "Great Progress!",
//     text: "You're making steady improvements every day!",
//   },
// ];

// export default function Home() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         className="absolute top-0 left-0 w-full h-full object-cover"
//       >
//         <source src="/images/d360487e96fd9c2d4106f002f3ea553d.mp4" type="video/mp4" />
//       </video>

//       {/* Dark Overlay */}
//       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 to-black">
//         {/* Content */}
//         <div className="absolute bottom-10 w-full flex flex-col gap-5 justify-center px-5">
//           <div className="bg-transparent py-6 rounded-xl max-w-sm shadow-lg backdrop-blur-md transition-opacity duration-500">
//             <p className="text-gray-400 text-sm">{messages[currentIndex].title}</p>
//             <h1 className="text-white text-3xl font-semibold leading-tight mt-2">
//               {messages[currentIndex].text}
//             </h1>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center space-x-2">
//             {messages.map((_, index) => (
//               <div
//                 key={index}
//                 className={`h-2 w-2 rounded-full transition-all duration-300 ${
//                   index === currentIndex ? "bg-white w-4" : "bg-gray-500"
//                 }`}
//               ></div>
//             ))}
//           </div>

//           {/* Buttons */}
//           <div className="w-full flex gap-5 justify-center">
//             <Link
//               href="/Sign-Up"
//               className="w-full py-4 text-stone-200 bg-stone-500 rounded-xl flex justify-center items-center font-semibold"
//             >
//               Sign Up
//             </Link>
//             <Link
//               href="/Sign-In"
//               className="w-full py-4 text-stone-400 border-2 border-stone-500 bg-transparent rounded-xl flex justify-center items-center font-semibold"
//             >
//               Sign In
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import Link from "next/link";
import { useState, useEffect } from "react";

const messages = [
  {
    id: 1,
    title: "FitTrack - Grow Together",
    text: "Since yesterday, your fitness stats have improved!",
    image: "/images/one.jpeg"
  },
  {
    id: 2,
    title: "Stay Consistent",
    text: "Regular tracking helps you stay on top of your goals!",
    image: "/images/three.jpeg"
  },
  {
    id: 3,
    title: "Great Progress!",
    text: "You're making steady improvements every day!",
    image: "/images/FRUMMY.jpeg"
  }
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
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${messages[currentIndex].image})` }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 to-black">
        {/* Content */}
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
  );
}