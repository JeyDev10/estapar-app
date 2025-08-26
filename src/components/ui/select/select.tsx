import * as React from "react"

import {
  Select as BaseSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@src/components/ui/select/base/base-select"

import { cn } from "@/src/lib/utils/style-utils"

export type SelectOptions = {
  label: string
  value: string
}

export type SelectProps = {
  options: SelectOptions[]
  onSelectValue?(value: string): void
  selectedValue?: string
  placeholder?: string
  defaultValue?: string
  isInvalid?: boolean
}

export function Select({ placeholder = "Selecione um item", ...props }: SelectProps) {
  return (
    <BaseSelect defaultValue={props.defaultValue} value={props.selectedValue} onValueChange={props.onSelectValue}>
      <SelectTrigger className={cn("w-full", props.isInvalid && "border-red-400")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.options.map((option, index) => {
            return (
              <SelectItem key={`${option}-${index}`} value={option.value}>
                {option.label}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </BaseSelect>
  )
}
