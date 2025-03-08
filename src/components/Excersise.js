"use client";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosRepeat } from "react-icons/io";
import { GrSubtract } from "react-icons/gr";
import { CgGym } from "react-icons/cg";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CreatedExcersise from "./CreatedExcersise";

const Exercise = ({ date }) => {
  const [dateone, setDate] = useState(date);
  const [excersises, setExcersise] = useState([]);
  const [nameone, setName] = useState("");
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const handleCreate = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("/api/createexc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dateone, nameone }),
      });

      if (response.ok) {
        const result = await response.json();
        setExcersise((prevExcersises) => [...prevExcersises, result.exercise]);
        setName(""); 
        setShouldRefetch((prev) => !prev); 
      } 
      else {
        const result = await response.json();
        console.log(result.message);
      }
    } 
    catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 py-5 ">
       <div className="w-full">
          <form onSubmit={handleCreate} className="flex justify-between items-center gap-7">
            <input
              type="text"
              id="username"
              value={nameone}
              onChange={(e) => setName(e.target.value)}
              placeholder="Add exercise"
              className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-100 border border-stone-600 focus:ring-2 focus:ring-stone-500 focus:outline-none placeholder-stone-500"
            ></input>
            <button type="submit" className="px-5 py-3 rounded-xl text-stone-900 bg-stone-400">
              Create
            </button>
          </form>
      </div>

    <CreatedExcersise date={date} shouldRefetch={shouldRefetch} setShouldRefetch={setShouldRefetch}/>
    </div>
  );
};

export default Exercise;
