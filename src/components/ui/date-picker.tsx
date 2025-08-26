"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@src/components/ui/button"
import { Calendar } from "@src/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@src/components/ui/popover"
import { cn } from "@/src/lib/utils"

export type DatePickerProps = {
  onChangeDate(dateValue: string | undefined): void
  name: string
  id: string
  defaultValue?: Date
  isInvalid?: boolean
}

export function DatePicker(props: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  React.useEffect(() => {
    if (props.defaultValue) setDate(props.defaultValue)
  }, [props.defaultValue])

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
