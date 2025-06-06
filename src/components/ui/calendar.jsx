"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({ className, classNames, ...props }) {
  return (
    <DayPicker
      showOutsideDays={false} // Hides dates from the previous month
      className={cn("p-3 w-full", className)}
      classNames={{
        months: "flex flex-col items-center w-full",
        month: "space-y-4 w-full",
        caption: "flex justify-between items-center w-full px-4",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-2",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "left-2",
        nav_button_next: "right-2",
        table: "w-full border-collapse",
        head_row: "grid grid-cols-7 w-full  sm:pr-8",
        head_cell:
          "text-stone-500 font-normal text-xs dark:text-stone-400 text-center sm:text-sm",
        row: "grid grid-cols-7 gap-1 w-full sm:pl-10 ",
        cell: cn(
          "relative p-0 text-center text-sm w-full sm:text-base",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 flex items-center justify-center text-sm sm:text-base sm:h-12 sm:w-16 sm:px-2"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-stone-400 text-stone-800 hover:bg-stone-700 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-300",
        day_today:
          "bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-stone-50",
        day_outside: "hidden", // Hides previous month's dates
        day_disabled: "text-stone-500 opacity-50 dark:text-stone-400",
        day_range_middle:
          "aria-selected:bg-stone-100 dark:aria-selected:bg-stone-800",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-5 w-5", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-5 w-5", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
