import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosRepeat } from "react-icons/io";
import { GrSubtract } from "react-icons/gr";
import { CgGym } from "react-icons/cg";
import { motion } from "framer-motion";

const CreatedExcersise = ({ date, shouldRefetch, setShouldRefetch }) => {
  const [excersises, setExcersise] = useState([]);
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [expandedExerciseId, setExpandedExerciseId] = useState(null); // To track expanded exercise

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetchexc?date=${encodeURIComponent(date)}`);
        if (response.ok) {
          const result = await response.json();
          setExcersise(result.excs || []);
        } else {
          const result = await response.json();
          console.log(result.message);
        }
      } catch (error) {
        alert("Something went wrong");
        console.log(error);
        setExcersise([]);
      }
    };
    fetchData();
  }, [shouldRefetch]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch('/api/deleteexc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application-json'
        },
        body: JSON.stringify({ id })
      });
      if (response.ok) {
        setShouldRefetch((prev) => !prev);
      } else {
        console.log("something wrong");
      }
    } catch (error) {
      console.log("Something went wrong..");
    }
  };

  const handleSubmit = async (id) => {
    const response = await fetch('/api/sets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application-json'
      },
      body: JSON.stringify({ id, weight, reps })
    });
    if (response.ok) {
      setWeight('');
      setReps('');
      setShouldRefetch((prev) => !prev);
    } else {
      console.log("not added");
    }
  };

  const handleDelset = async (exid, setid) => {
    try {
      const response = await fetch('/api/deleteset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application-json'
        },
        body: JSON.stringify({ exid, setid })
      });
      if (response.ok) {
        setShouldRefetch((prev) => !prev);
      } else {
        console.log("something wrong");
      }
    } catch (error) {
      console.log("Something went wrong..");
    }
  };

  return (
    <>
      {excersises.length === 0 ? (
        <div className="text-center text-stone-300 py-5">No exercises available</div>
      ) : (
        <div className="gap-5 pb-32 flex flex-col-reverse">
          {excersises.map((exercise) => (
            <motion.div
              key={exercise._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.5 }}
              className="p-5 w-full h-auto bg-stone-800 rounded-xl text-stone-300"
            >
              {/* Exercise header (click to expand) */}
              <div
                className="w-full flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedExerciseId(expandedExerciseId === exercise._id ? null : exercise._id)}
              >
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl">{exercise.name}</h1>
                  <h1 className="text-sm">{exercise.sets.length} sets</h1>
                </div>

                <div onClick={() => handleDelete(exercise._id)} className="text-xl bg-red-500 text-stone-300 p-2 rounded-xl">
                  <MdDelete />
                </div>
              </div>

              {/* Conditionally render the sets and input fields if the exercise is expanded */}
              {expandedExerciseId === exercise._id && (
                <div className="pt-5 w-full flex flex-col gap-5">
                  <div className="w-full flex flex-col gap-3 justify-between items-center">
                    {exercise.sets.map((set, index) => (
                      <div key={index} className="w-full flex gap-5 justify-between items-center">
                        <div className="w-full flex gap-5 items-center">
                          <div className="flex gap-3">
                            <CgGym className="text-2xl" />
                            <h1>: {set.weight} kgs</h1>
                          </div>
                          <div className="flex gap-3">
                            <IoIosRepeat className="text-2xl" />
                            <h1>: {set.reps}</h1>
                          </div>
                        </div>
                        <button onClick={() => handleDelset(exercise._id, set._id)}>
                          <GrSubtract className="text-red-500 text-lg mx-2" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="w-full">
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(exercise._id); }} className="w-full flex gap-3 items-center justify-between">
                      <div className="w-full flex gap-5 items-center">
                        <input
                          type="number"
                          id="weight"
                          value={weight}
                          onChange={(e) => { setWeight(e.target.value); }}
                          placeholder="Weight"
                          className="w-24 px-2 py-2 rounded-lg bg-stone-700 text-stone-100 border border-stone-600 focus:ring-2 focus:ring-stone-500 focus:outline-none placeholder-stone-500"
                        />
                        <input
                          type="number"
                          id="reps"
                          value={reps}
                          onChange={(e) => { setReps(e.target.value); }}
                          placeholder="Reps"
                          className="w-24 px-2 py-2 rounded-lg bg-stone-700 text-stone-100 border border-stone-600 focus:ring-2 focus:ring-stone-500 focus:outline-none placeholder-stone-500"
                        />
                      </div>
                      <button type="submit" className="px-4 py-2 rounded-xl text-stone-200 bg-stone-600">
                        Add Set
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default CreatedExcersise;
