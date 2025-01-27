"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useRouter } from "next/navigation";

const WeeklyCalendar = ({ params }) => {
  const router = useRouter();
  const urlDate = params?.date || null; // Extract date from props

  // Default selected date from params or use today's date
  const [selectedDate, setSelectedDate] = useState(
    urlDate ? new Date(urlDate) : new Date()
  );
  const [currentDate, setCurrentDate] = useState(
    urlDate ? new Date(urlDate) : new Date()
  );

  // Generate days of the current week
  const getWeekDays = (date) => {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay() + 1); // Start of the week (Monday)

    return Array.from({ length: 7 }).map((_, index) => {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + index);
      return day;
    });
  };

  const currentWeek = getWeekDays(currentDate);

  const handlePreviousWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  };

  const isSelected = (date) => {
    return (
      selectedDate.getDate() === date.getDate() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getFullYear() === date.getFullYear()
    );
  };

  const handleDateSelect = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = date.getFullYear();

  setSelectedDate(date);
  router.push(`/Days/${day}-${month}-${year}`);
  };

  useEffect(() => {
    if (urlDate) {
      setSelectedDate(new Date(urlDate));
      setCurrentDate(new Date(urlDate));
    }
  }, [urlDate]);

  return (
    <div className="w-full max-w-md mx-auto text-stone-300 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 w-full">
        <div className="flex justify-evenly items-center w-full">
          <button
            onClick={handlePreviousWeek}
            className="p-2 bg-stone-700 rounded-lg hover:bg-gray-700"
          >
            <AiOutlineLeft className="text-white" />
          </button>

          <h2 className="text-lg font-bold">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h2>

          <button
            onClick={handleNextWeek}
            className="p-2 bg-stone-700 rounded-lg hover:bg-gray-700"
          >
            <AiOutlineRight className="text-white" />
          </button>
        </div>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-2">
        {currentWeek.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDateSelect(day)}
            className={`cursor-pointer flex flex-col items-center p-2 rounded-lg ${
              isToday(day)
                ? "bg-yellow-500 text-black"
                : isSelected(day)
                ? "bg-stone-400 text-black"
                : "bg-stone-800"
            }`}
          >
            <span className="text-xs uppercase">
              {day.toLocaleString("default", { weekday: "short" }).charAt(0)}
            </span>
            <span className="text-sm font-semibold">{day.getDate()}</span>
            {isToday(day) && (
              <span className="text-xs font-medium text-gray-600 mt-1">
                Today
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
