"use client"
import { useEffect, useState } from "react"

import { Eye } from "lucide-react"

import { useGetGarages } from "@/src/features/garages/hooks/use-get-garages"
import { GarageType } from "@src/domain/interfaces/garage"

import { DataTable } from "@src/components/ui/table/table"
import { ColumnConfig } from "@src/components/ui/table/interfaces"
import { Button } from "@src/components/ui"

import { GarageDetails } from "@src/features/garages/containers/garage-details"
import { GarageTableHeader } from "@src/features/garages/components/garage-table-header"

export function GaragesTable() {
  const [selectedGarage, setSelectedGarage] = useState<GarageType | undefined>()
  const { handleRequest, data, error } = useGetGarages()

  useEffect(() => {
    handleRequest({ pageSize: 10, currentPage: 1 })
  }, [])

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
      <GarageTableHeader recordsCount={data?.countRecords} />
      <DataTable<GarageType> data={data?.data as GarageType[]} columns={columns} />
      {selectedGarage && <GarageDetails garage={selectedGarage} onClose={() => setSelectedGarage(undefined)} />}
    </div>
  )
}
