import * as React from "react"

import { LucideIcon } from "lucide-react"

import { cn } from "@src/lib/utils"

export type InputProps = React.ComponentProps<"input"> & { label?: string; icon?: LucideIcon }

function Input({ className, type, label, icon, ...props }: InputProps) {
  const Icon = icon

  return (
    <div>
      {label && (
        <label className="inline-block font-bold mb-2" htmlFor={props.name}>
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex items-center gap-2",
          "px-4",
          "border-2 border-gray-tertiary  rounded-md bg-transparent",
          "focus-within:border-gray-400"
        )}
      >
        {Icon && <Icon className="text-gray-secondary" />}
        <input
          type={type}
          data-slot="input"
          className={cn(
            "flex h-9 w-full min-w-0",
            "peer",
            "border-none",
            "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-2  px-3 py-1 text-base transition-[color,box-shadow] outline-none  md:text-sm",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:ring-destructive/20  aria-invalid:border-destructive",
            className
          )}
          {...props}
        />
      </div>
    </div>
  )
}

export { Input }
