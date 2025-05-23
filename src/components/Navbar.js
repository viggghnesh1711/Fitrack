"use client"
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from 'next/link';
import { useEffect, useState } from "react";

const Navbar = () => {
  const [username, setUsername] = useState(null);  // Store the username state
  const [loading, setLoading] = useState(true);  // Handle loading state
  const [error, setError] = useState(null);  // Handle error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/username');
        
        if (!response.ok) {
          throw new Error('Failed to fetch username');
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setUsername(data.username);  // Set the username
      
      } catch (err) {
        console.error(err);
        
      }
    };

    fetchData();  // Call the async function to fetch data
  }, []);  //
  
  return (
    <nav className="sm:hidden w-full flex items-center justify-between">
      <div>
        <p className="text-lg text-stone-500 font-semibold">
          Welcome<br></br> back, <span className="text-stone-300">{username}</span> 👋
        </p>
      </div>
      <div className="flex gap-5 items-center space-x-2">
        <Link href='/Notifications'>
                <IoMdNotificationsOutline className="text-4xl text-stone-300"/>
        </Link>
        <Link href='/Account'>
                <Avatar>
            <AvatarImage src="/images/barbell.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </Link>
      </div>
    </nav>
  );
};

export default Navbar;
