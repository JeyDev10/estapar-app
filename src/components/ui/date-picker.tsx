"use client"

import { useEffect, useState } from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@src/components/ui/button"
import { Calendar } from "@src/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@src/components/ui/popover"

export type DatePickerProps = {
  onChangeDate(dateValue: string | undefined): void
  name: string
  id: string
  defaultValue?: Date
  isInvalid?: boolean
}

export function DatePicker(props: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    if (props.defaultValue) {
      console.log("here")
      setDate(props.defaultValue)
    }
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={props.isInvalid ? "invalid" : "input"}
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date: Date | undefined) => {
              console.log("Date teste:", date?.toLocaleDateString())
              props.onChangeDate?.(date?.toLocaleDateString())
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
