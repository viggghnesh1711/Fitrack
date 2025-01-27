"use client";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosRepeat } from "react-icons/io";
import { GrSubtract } from "react-icons/gr";
import { CgGym } from "react-icons/cg";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Exercise = ({ date }) => {
  const [dateone, setDate] = useState(date);
  const [excersises, setExcersise] = useState([]);
  const [nameone, setName] = useState("");

  // Create new exercise
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
        window.location.reload();
      } else {
        const result = await response.json();
        console.log(result.message);
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  // Fetch exercises on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fetchexc");
        if (response.ok) {
          const result = await response.json();
          console.log(result.excs); // Log the result to inspect the structure
          setExcersise(result.excs || []); // Default to empty array if excs is undefined
        } else {
          const result = await response.json();
          console.log(result.message);
        }
      } catch (error) {
        alert("Something went wrong");
        console.log(error);
        setExcersise([]); // Ensure we default to an empty array if there's an error
      }
    };

    fetchData();
  }, []);

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

      {excersises.length === 0 ? (
        <div className="text-center text-stone-300 py-5">No exercises available</div>
      ) : (
        <div className="space-y-5">
          {excersises.map((exercise) => (
            <motion.div
              key={exercise.id} // Ensure each exercise has a unique key
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-5 w-full h-auto bg-stone-800 rounded-xl text-stone-300"
            >
              <div className="w-full flex justify-between items-center cursor-pointer">
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl">{exercise.name}</h1>
                  <h1 className="text-sm">3 sets</h1>
                </div>
                <div className="text-xl bg-red-500 text-stone-300 p-2 rounded-xl">
                  <MdDelete />
                </div>
              </div>

              <div className="py-5 w-full flex flex-col gap-3">
                  <div
                    className="w-full flex gap-5 justify-between items-center"
                  >
                    <div className="w-full flex gap-5 items-center">
                      <div className="flex gap-3">
                        <CgGym className="text-2xl" />
                        <h1>: 45 kgs</h1>
                      </div>

                      <div className="flex gap-3">
                        <IoIosRepeat className="text-2xl" />
                        <h1>: 10</h1>
                      </div>
                    </div>

                    <button>
                      <GrSubtract className="text-red-500 text-lg mx-2" />
                    </button>
                  </div>
              
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exercise;
