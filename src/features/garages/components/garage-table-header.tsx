import { Search } from "lucide-react"

import { Switch, Input, Button } from "@src/components/ui"

export type GarageTableHeader = {
  recordsCount?: number
}

export function GarageTableHeader(props: GarageTableHeader) {
  return (
    <div className="flex flex-col max-sm:gap-1 md:flex-row md:items-center justify-between mt-4 rounded-sm border border-gray-tertiary px-4 py-6 mb-4">
      <div className="flex gap-2 items-center">
        <Switch defaultChecked name="digital-monthly-payers" id="digital-monthly-payers" />
        <label htmlFor="digital-monthly-payers" className="font-semibold">
          Mensalista Digital
        </label>
      </div>
      <span>{`${props.recordsCount || 0} registros`}</span>
      <Input icon={Search} placeholder="Buscar por nome" className="max-w-sm" />
    </div>
  )
}
