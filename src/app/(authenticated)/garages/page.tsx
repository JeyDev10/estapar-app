"use client"
import { useEffect } from "react"

import { Building2, Search, Eye } from "lucide-react"

import { GarageType } from "@/domain/interfaces/garage"
import garagesData from "@/domain/garage-list.json"
import { DataTable } from "@/components/ui/table/table"
import { DialogDemo } from "@/components/ui/dialog/dialog"
import { ColumnConfig } from "@/components/ui/table/interfaces"
import { Switch, Input, Button } from "@/components/ui"

async function getProjects() {
  const res = await fetch(`https://mock.apidog.com/m1/1022746-0-default/Authenticate`, {
    body: JSON.stringify({ username: "estapar", password: "@estapar@" }),
    cache: "no-store",
    method: "post",
    headers: { "Content-Type": "application/json" }
  })
  const projects = await res.json()

  return projects
}

async function getGarages() {
  const res = await fetch(
    `https://mock.apidog.com/m1/1022746-0-default/GetGaragesPaginatedList?currentPage=2&pageSize=10`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer f5183967-b473-457d-953e-5a793b4919d3"
      }
    }
  )
  const garages = await res.json()

  return garages
}

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
      <Button variant="transparent">
        <Eye size={16} onClick={() => console.log(row)} />
      </Button>
    )
  }
]

export default function Garages() {
  useEffect(() => {
    const garages = getGarages()

    console.log(garages)
  }, [])

  return (
    <div>
      <div>
        <div className="flex gap-4 items-center">
          <Building2 size={32} className="text-brand-primary" />
          <h1 className="text-3xl font-bold">Garagens</h1>
        </div>
        <span className="text-gray-secondary">Visualize as garagens habilitadas para mensalistas digitais.</span>
      </div>
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
      {/* <DataTable data={garagesData.data} columns={columns} /> */}
      <DataTable<GarageType> data={garagesData.data as GarageType[]} columns={columns} />
      <DialogDemo />
    </div>
  )
}
