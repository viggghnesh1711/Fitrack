import React from 'react'

const loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-900">
      {/* Loader */}
      <div className="flex space-x-2">
        <div className="w-4 h-4 rounded-full bg-stone-400 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-stone-500 animate-bounce200"></div>
        <div className="w-4 h-4 rounded-full bg-stone-600 animate-bounce400"></div>
      </div>
    </div>
  )
}

export default loading