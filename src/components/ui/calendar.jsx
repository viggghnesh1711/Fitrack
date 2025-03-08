"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 w-full", className)}
      classNames={{
        months: "flex flex-col items-center w-full", // Ensures centered months
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
        table: "w-full border-collapse", // Ensures proper layout
        head_row: "grid grid-cols-7 w-full", // Aligns week days correctly
        head_cell:
          "text-stone-500 font-normal text-xs dark:text-stone-400 text-center",
        row: "grid grid-cols-7 gap-1 w-full", // Ensures proper date structure
        cell: cn(
          "relative p-0 text-center text-sm w-full",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 flex items-center justify-center text-sm"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-stone-900 text-stone-50 hover:bg-stone-700 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-300",
        day_today:
          "bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-stone-50",
        day_outside:
          "text-stone-400 dark:text-stone-500",
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


