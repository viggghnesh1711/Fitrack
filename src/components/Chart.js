"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  mobile: {
    label: "Mobile",
    color: "#D1D5DB", // Tailwind stone-300 color in hex
  },
};

export default function Component() {
  const [timeRange, setTimeRange] = React.useState("7d");
  const [chartData, setChartData] = React.useState([]); // To store the chart data fetched from API

  // Fetch chart data from the backend
  React.useEffect(() => {
    const fetchChartData = async () => {
    
      try {
        const response = await fetch('/api/chart');
        const data = await response.json();
        
        if (data?.chartData) {
          setChartData(data.chartData); // Update the chartData state with the fetched data
        

        } else {
          console.log("no data found")
          console.error("No chart data found");
        }
      } catch (error) {
        console.error("Error fetching chart data", error);
      }
    };

    fetchChartData(); // Call the fetch function when component mounts
  }, []); // Empty dependency array to run this only once when the component mounts

  // Filter data based on selected time range
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="bg-stone-900 border-none">
      <CardHeader className=" py-5">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-left text-stone-500 font-semibold">Growth-chart</CardTitle>
          </div>
          <div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="w-[130px] rounded-lg sm:ml-auto border-none bg-stone-800 text-stone-400"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Last 3 months border-none" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  Last 3 months
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Last 30 days
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Last 7 days
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:px-6">
  {filteredData && filteredData.length > 0 ? (
    <ChartContainer config={chartConfig} className="aspect-auto h-[150px] w-full">
      <AreaChart data={filteredData}>
        <defs>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255, 255, 255,0)" strokeDasharray="none" vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          interval={1}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <ChartTooltip
          className='bg-stone-700 text-stone-300'
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              indicator="dot"
            />
          }
        />
        <Area
          dataKey="mobile"
          type="natural"
          fill="url(#fillMobile)"
          stroke="#D1D5DB"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  ) : (
    <div className="h-[150px] flex items-center justify-center text-stone-600 text-sm text-center">
     "Start logging your exercises to see your progress here!"
    </div>
  )}
</CardContent>


    </Card>
  );
}
