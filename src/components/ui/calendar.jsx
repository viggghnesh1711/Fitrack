"use client";
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-full p-3", className)} // Ensure full width
      classNames={{
        months: "flex flex-col sm:flex-row w-full gap-4", // Adjust gaps
        month: "space-y-4 w-full", // Ensure months are full width
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-4 w-4 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1", // Make table full width
        head_row: "flex justify-between", // Adjust head row spacing
        head_cell:
          "text-stone-500 rounded-md w-full font-normal text-[0.8rem] dark:text-stone-400", // Adjust cell width
        row: "flex w-full justify-between mt-2", // Ensure rows are full width
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-full",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-5 w-5 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-stone-900 text-stone-50 hover:bg-stone-300 hover:text-stone-900 focus:bg-stone-900 focus:text-stone-50 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50 dark:hover:text-stone-900 dark:focus:bg-stone-50 dark:focus:text-stone-900",
        day_today: "bg-stone-100 text-stone-900 dark:bg-stone-100 dark:text-stone-50",
        day_outside:
          "day-outside text-stone-500 aria-selected:bg-stone-100/50 aria-selected:text-stone-500 dark:text-stone-400 dark:aria-selected:bg-stone-800/50 dark:aria-selected:text-stone-400",
        day_disabled: "text-stone-500 opacity-50 dark:text-stone-400",
        day_range_middle:
          "aria-selected:bg-stone-100 aria-selected:text-stone-900 dark:aria-selected:bg-stone-800 dark:aria-selected:text-stone-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

