"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTheme } from "next-themes"

interface DateRangePickerProps {
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
  className?: string
  align?: "center" | "start" | "end"
}

export function DateRangePicker({ dateRange, onDateRangeChange, className, align = "start" }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const { theme } = useTheme()

  const handleSelect = (range: DateRange | undefined) => {
    onDateRangeChange(range)
    if (range?.from && range?.to) {
      setIsOpen(false)
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal bg-gray-900 border-gray-700 text-white hover:bg-gray-800 hover:text-white",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Select date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700 text-white" align={align}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            className="bg-gray-900 text-white"
            classNames={{
              day_selected:
                "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white",
              day_today: "bg-gray-800 text-white",
              day_outside: "text-gray-500 opacity-50",
              day_disabled: "text-gray-500 opacity-50",
              day_range_middle: "bg-gray-800 text-white",
              day_hidden: "invisible",
              caption: "text-white",
              caption_label: "text-white font-medium",
              nav_button: "text-gray-400 hover:text-white border border-gray-700 bg-gray-800 hover:bg-gray-700",
              table: "border-collapse space-y-1",
              head_cell: "text-gray-400 font-normal text-xs",
              cell: "text-sm p-0 relative first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white transition-all duration-200",
              day_range_end: "day-range-end",
              day_range_start: "day-range-start",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

