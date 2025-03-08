"use client"
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";

const getRandomValue = (max) => Math.floor(Math.random() * max) + 50;

export default function NutritionTracker() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = [
      { name: "Calories", value: getRandomValue(2500), color: "#57534e" }, // Stone-700
      { name: "Protein", value: getRandomValue(200), color: "#78716c" }, // Stone-500
      { name: "Carbs", value: getRandomValue(300), color: "#44403c" }, // Stone-800
    ];
    setData(newData);
  }, []);

  return (
    <div className="flex items-center justify-between p-4 py-6  bg-stone-900 text-white rounded-2xl shadow-lg w-80">
      <div className="flex flex-col justify-center">
        <h2 className="text-lg font-bold text-stone-500 mb-3">Daily Nutrition</h2>
        {data.map((item) => (
          <p key={item.name} className="text-base text-stone-300">
            {item.name}: <span className="font-semibold">{item.value}</span>
          </p>
        ))}
       
      </div>
      <div className="flex flex-col justify-between">
      <PieChart width={100} height={100}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={45}
          paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
      <p className="text-sm font-bold mt-1 text-center text-stone-300">
          Total: {data.reduce((sum, item) => sum + item.value, 0)}
        </p>
      </div>
      
    </div>
  );
}
