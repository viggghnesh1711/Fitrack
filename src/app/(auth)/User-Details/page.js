"use client";
import { useState } from "react";
import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Page = () => {
  const router = useRouter()
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [inputValues, setInputValues] = useState(["", "", "", ""]);

  const handleNext = (e) => {
    e.preventDefault()
    if (inputValues[currentInputIndex].trim() !== "") {
      setCurrentInputIndex(currentInputIndex + 1);
    } else {
      toast.error("Please fill in the field before proceeding.",
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      )
    }
  };

  const handleBack = () => {
    if (currentInputIndex > 0) {
      setCurrentInputIndex(currentInputIndex - 1);
    }
  };

  const handleInputChange = (e) => {
    const updatedValues = [...inputValues];
    updatedValues[currentInputIndex] = e.target.value;
    setInputValues(updatedValues);
  };

  const handleGoalSelection = (goal,e) => {
    e.preventDefault()
    const updatedValues = [...inputValues];
    updatedValues[3] = goal;
    setInputValues(updatedValues);
  };

  const handleFinish = async (e) =>{
    console.log(inputValues)
    e.preventDefault()
    const response = await fetch('/api/userdetails',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(inputValues)
    })

    if(response.ok){
      const result = response.json()
      router.push('/Home')
      toast.success("Everthings done")
    }
    else{
      const result = response.json()
      toast.error(result.message)
    }
  }

  return (
    <div className="w-full h-screen px-8 pt-16 bg-stone-900 relative overflow-y-hidden ">
      <Toaster/>
      <div className=" flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-stone-200 mb-1 tracking-wide">
          {currentInputIndex === 0 && "Lets Start ..."}
          {currentInputIndex === 1 && "One More ..."}
          {currentInputIndex === 2 && "Just One More ..."}
          {currentInputIndex === 3 && "And we are done ..."}
        </h2>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-stone-500 shadow-lg shadow-slate-400"
            style={{ width: `${((currentInputIndex + 1) / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      <form className="mt-10 h-3/5 w-full" onSubmit={handleFinish}>
        <div className="h-full w-full">
          {currentInputIndex === 0 && (
            <div className="h-full w-full flex flex-col gap-8 ">
              <div className="text-stone-300 w-4/5 tracking-wider">
                <h1> What would you like your username to be? </h1>
              </div>
              <div>
                <input
                  type="text"
                  id="username"
                  placeholder="username"
                  value={inputValues[0]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-100 border border-stone-600 focus:ring-2 focus:ring-stone-500 focus:outline-none placeholder-stone-500"
                ></input>
              </div>
            </div>
          )}

            {currentInputIndex === 1 && (
              <div className="h-full w-full flex flex-col gap-16">
                <div className="text-stone-300 w-4/5 tracking-wider">
                  <h1> What is your weight? </h1>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <span className="text-stone-200 text-4xl">{inputValues[1]} kg</span>
                  <input
                    type="range"
                    min="2"
                    max="130"
                    value={inputValues[1]}
                    onChange={(e) => {
                      const updatedValues = [...inputValues];
                      updatedValues[1] = e.target.value;
                      setInputValues(updatedValues);
                    }}
                    className="w-full slider-thumb text-4xl rounded-2xl bg-stone-700 accent-stone-600"
                  />
                </div>
              </div>
            )}


            {currentInputIndex === 2 && (
              <div className="h-full w-full flex flex-col gap-16">
                <div className="text-stone-300 w-4/5 tracking-wider">
                  <h1> What is your height? </h1>
                </div>
                <div className="w-full flex  flex-row-reverseitems-center justify-between py-10 ">
                
                    <input
                      type="range"
                      min="50"
                      max="250"
                      value={inputValues[2]}
                      onChange={(e) => {
                        const updatedValues = [...inputValues];
                        updatedValues[2] = e.target.value;
                        setInputValues(updatedValues);
                      }}
                      className="w-full h-full slider-thumb text-4xl rounded-2xl bg-stone-700 accent-stone-600 rotate-90 absolute bottom-0 left-1/2 transform -translate-x-1/2"
                    />
                    <span className="text-stone-200 text-4xl">{inputValues[2]} cm</span>
                </div>
              </div>
            )}

            {currentInputIndex === 3 && (
              <div className="h-full w-full flex flex-col gap-10">
                <div className="text-stone-300 w-4/5 tracking-wider">
                  <h1> What is your goal for this week? </h1>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={(e) => handleGoalSelection("Lose weight",e)}
                      className={`w-24 h-24 text-base rounded-full border-2 border-stone-600 text-stone-100 flex items-center justify-center ${
                        inputValues[3] === "Lose weight" ? "bg-stone-500" : "bg-stone-700"
                      }`}
                    >
                      Lose Weight
                    </button>
                    <button
                      onClick={(e) => handleGoalSelection("Gain weight",e)}
                      className={`w-24 h-24 text-base rounded-full border-2 border-stone-600 text-stone-100 flex items-center justify-center ${
                        inputValues[3] === "Gain weight" ? "bg-stone-500" : "bg-stone-700"
                      }`}
                    >
                      Gain Weight
                    </button>
                    <button
                      onClick={(e) => handleGoalSelection("Maintain weight",e)}
                      className={`w-24 h-24 text-base rounded-full border-2 border-stone-600 text-stone-100 flex items-center justify-center ${
                        inputValues[3] === "Maintain weight" ? "bg-stone-500" : "bg-stone-700"
                      }`}
                    >
                      Maintain Weight
                    </button>
                  </div>
                </div>
              </div>
            )}

        </div>

        <div className="flex justify-between mt-8 ">
          {currentInputIndex > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="bg-stone-500 text-stone-700 font-bold py-2 px-4 rounded-full"
            >
              Back
            </button>
          )}
          {currentInputIndex < 3 ? (
            <motion.button
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 1.10 }} 
              type="button"
              onClick={(e) => handleNext(e)}
              className="bg-stone-200 text-stone-900 font-bold py-3 px-8 rounded-full shadow-lg shadow-slate-500 ml-auto"
            >
              Next
            </motion.button>
          ) : (
            <motion.button
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 1.10 }} 
              type="submit"
              className="bg-stone-200 hover:bg-green-600 text-stone-700 font-bold py-3 px-6 rounded-full ml-auto"
            >
              Finish
            </motion.button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Page;
