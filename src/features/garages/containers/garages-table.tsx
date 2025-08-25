"use client"
import { useEffect, useState } from "react"

import { Search, Eye } from "lucide-react"

import { useGetGarages } from "@/src/features/garages/hooks/use-get-garages"
import { GarageType } from "@src/domain/interfaces/garage"
import garagesData from "@src/domain/garage-list.json"

import { DataTable } from "@src/components/ui/table/table"
import { ColumnConfig } from "@src/components/ui/table/interfaces"
import { Switch, Input, Button } from "@src/components/ui"

import { GarageDetails } from "@src/features/garages/containers/garage-details"

export function GaragesTable() {
  const [selectedGarage, setSelectedGarage] = useState<GarageType | undefined>()
  const { handleRequest, data, error } = useGetGarages()

  useEffect(() => {
    handleRequest({ pageSize: 10, currentPage: 1 })
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  const columns: ColumnConfig<GarageType>[] = [
    { id: "code", header: "Código" },
    { id: "name", header: "Nome" },
    { id: "address", header: "Endereço" },
    { id: "city", header: "Cidade" },
    { id: "state", header: "UF" },
    { id: "region", header: "Regional" },
    {
      id: "actions",
      header: "Ações",
      format: (row) => (
        <Button variant="transparent" onClick={() => setSelectedGarage(row)}>
          <Eye size={16} />
        </Button>
      )
    }
  ]

  return (
    <div>
      <div className="flex items-center justify-between mt-4 rounded-sm border border-gray-tertiary px-4 py-6 mb-4">
        <div className="flex gap-2 items-center">
          <Switch name="digital-monthly-payers" id="digital-monthly-payers" />
          <label htmlFor="digital-monthly-payers" className="font-semibold">
            Mensalista Digital
          </label>
        </div>
        <span>25 registros</span>
        <Input icon={Search} placeholder="Buscar por nome" className="max-w-sm" />
      </div>
      <DataTable<GarageType> data={garagesData.data as GarageType[]} columns={columns} />
      {selectedGarage && <GarageDetails garage={selectedGarage} onClose={() => setSelectedGarage(undefined)} />}
    </div>
  )
}
