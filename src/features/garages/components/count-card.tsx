import { JSX } from "react"

import { LucideIcon } from "lucide-react"
import { Card } from "@src/components/ui/card"

export type CountCardProps = {
  label: string
  count: number
  icon: JSX.Element
}

export function CountCard(props: CountCardProps) {
  const icon = props.icon
  return (
    <Card className="gap-2">
      <span className="text-gray-secondary font-bold">{props.label}</span>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-gray-primary font-bold">{props.count}</span>
      </div>
    </Card>
  )
}
