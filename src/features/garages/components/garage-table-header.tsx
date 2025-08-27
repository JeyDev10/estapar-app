import { useEffect, useState } from "react"
import { Search } from "lucide-react"

import { Switch, Input } from "@src/components/ui"
import { useDebounce } from "@/src/hooks/use-debounce"

export type GarageTableHeader = {
  recordsCount?: number
  onSearch(value: string): void
}

export function GarageTableHeader(props: GarageTableHeader) {
  const [searchValue, setSearchValue] = useState<string>("")
  const debouncedValue = useDebounce(searchValue, 300)

  useEffect(() => {
    if (debouncedValue) props.onSearch(debouncedValue)
  }, [debouncedValue])

  return (
    <div className="flex flex-col max-sm:gap-1 md:flex-row md:items-center justify-between mt-4 rounded-sm border border-gray-tertiary px-4 py-6 mb-4">
      <div className="flex gap-2 items-center">
        <Switch defaultChecked name="digital-monthly-payers" id="digital-monthly-payers" />
        <label htmlFor="digital-monthly-payers" className="font-semibold">
          Mensalista Digital
        </label>
      </div>
      <span>{`${props.recordsCount || 0} registros`}</span>
      <Input
        icon={Search}
        placeholder="Buscar por nome"
        className="max-w-sm"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </div>
  )
}
