"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import { type DateRange } from "react-day-picker"

export default function DateRangePicker({
  className,
  onDateRangeChange,
  numberOfMonths = 2,
  indicators = [],
  indicatorClassName = "bg-blue-500",
}: React.HTMLAttributes<HTMLDivElement> & {
  onDateRangeChange?: (range: DateRange | undefined) => void,
  numberOfMonths?: 1 | 2,
  indicators?: Date[],
  indicatorClassName?: string,
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -20),
    to: new Date(),
  })
  
  // Track the temporary date selection before confirmation
  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(date)
  
  // Track if the popover is open
  const [isOpen, setIsOpen] = React.useState(false)
  
  // Handle date selection in the calendar
  const handleSelect = (selectedDate: DateRange | undefined) => {
    setTempDate(selectedDate)
  }
  
  // Handle confirmation of the selected date range
  const handleConfirm = () => {
    setDate(tempDate)
    setIsOpen(false)
    
    // Call the callback function if provided
    if (onDateRangeChange) {
      onDateRangeChange(tempDate)
    }
  }
  
  // Handle resetting the date selection
  const handleReset = () => {
    setTempDate(undefined)
  }
  
  // Sync tempDate with date when popover opens
  React.useEffect(() => {
    if (isOpen) {
      setTempDate(date)
    }
  }, [isOpen, date])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", numberOfMonths === 1 ? "max-w-[350px]" : "")} align="start">
          <div className="space-y-3">
            <Calendar
              autoFocus
              mode="range"
              defaultMonth={tempDate?.from || new Date()}
              selected={tempDate}
              onSelect={handleSelect}
              numberOfMonths={numberOfMonths}
              className="border-b"
              //rangeStartClassName="bg-blue-500/50 rounded-2"
              modifiers={{
                indicator: indicators,
              }}
              modifiersClassNames={{
                indicator: indicatorClassName,
              }}

            />
            <div className="flex items-center justify-between px-3 pb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                size="sm"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}