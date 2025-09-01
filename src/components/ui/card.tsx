import { ComponentProps } from "react"

import { cn } from "@src/lib/utils/style-utils"

function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-tertiary p-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export { Card }
