// components/NavbarSidebar.tsx
"use client";
import { useEffect, useState } from "react";


const NavbarSidebar = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/username");
        if (!response.ok) throw new Error("Failed to fetch username");

        const data = await response.json();
        setUsername(data.username);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
        <div>
      <p className="text-sm sm:text-xl text-stone-400">
        Welcome back,
        <br />
        <span className="text-stone-300 font-semibold">{username ?? "..."}</span> 👋
      </p>
       </div>
      
    </div>
  );
};

export default NavbarSidebar;
