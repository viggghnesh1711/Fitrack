"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BsRobot } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im"; // Import a loading spinner icon

const Chatbot = () => {
  const [userPrompt, setUserInput] = useState('');
  const [user, setUser] = useState(''); // Store the submitted question
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSend = async (e) => {
    e.preventDefault(); 
    setLoading(true); // Set loading to true when the request is sent
    setUser(userPrompt); // Store the submitted question
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userPrompt)
    });
    if (response.ok) {
      const result = await response.json();
      setChatInput(result.replyone);
      setUserInput(''); // Clear the input field after submission
    } else {
      alert("Something went wrong");
    }
    setLoading(false); // Set loading to false when the response is received
  };

  return (
    <div className='w-full h-96 py-5'>
      <div className="py-10 flex items-center space-x-2 mt-auto">
        <form onSubmit={handleSend} className='flex items-center space-x-2 sm:space-x-20 sm:w-full'>
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full sm:w-full px-4 py-3 rounded-lg sm:text-lg bg-stone-700 text-stone-100 border border-stone-600 focus:ring-2 focus:ring-stone-500 focus:outline-none placeholder-stone-500"
            placeholder="Type your question..."
          />
          <button
            type='submit'
            className="bg-stone-200 text-stone-900 font-bold py-3 px-8 rounded-full shadow-lg shadow-slate-500 ml-auto sm:text-lg"
            disabled={loading} // Disable the button when loading
          >
            {loading ? <ImSpinner2 className="animate-spin" /> : 'Ask'} {/* Show spinner when loading */}
          </button>
        </form>
      </div>
      <div className='flex flex-col gap-5 '>
        <div>
          <h1 className='text-stone-400 text-lg sm:text-xl'>
            {user || userPrompt || "Hey! Need help with your fitness? Ask me anything! 💪😊"}
          </h1>
        </div>
        <div>
          <h1 className='text-stone-500 h-64 w-full text-base overflow-y-scroll sm:text-xl  sm:overflow-hidden'>
            {loading ? ( // Show loading spinner while waiting for response
              <div className='w-full h-full flex justify-center items-center'>
                <ImSpinner2 className="animate-spin" style={{ fontSize: '50px', color: 'gray' }} />
              </div>
            ) : chatInput ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {chatInput.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.5 }} // Adjust delay for each word
                  >
                    {word}{' '}
                  </motion.span>
                ))}
              </motion.div>
            ) : (
              <div className='w-full h-full flex justify-center items-center'>
                <BsRobot style={{ fontSize: '50px', color: 'gray' }} />
              </div>
            )}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;