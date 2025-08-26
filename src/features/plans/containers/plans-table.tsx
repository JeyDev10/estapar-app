"use client"
import { useEffect } from "react"

import { Plus, CircleDollarSign, SquarePen, Car } from "lucide-react"

import { RoundedDataTable } from "@src/components/ui/table/rounded-table"
import { Button, Badge } from "@/src/components/ui"
import { useGetPlans } from "@src/features/plans/hooks/useGetPlans"

import { PlanType } from "@/src/domain/interfaces/plans"
import { ColumnConfig } from "@src/components/ui/table/interfaces"

import { PlansTableSkeleton } from "@src/features/plans/containers/plans-table-skeleton"
import { useCreatePlan } from "@src/features/plans/hooks/useCreatePlan"

export type PlansTableProps = {
  onOpenForm?(plan?: PlanType): void
}

export function PlansTable(props: PlansTableProps) {
  const { handleRequest, data, error, isLoading } = useGetPlans()
  // const { handleRequest: handleSave, data: dataSave } = useCreatePlan()

  useEffect(() => {
    handleRequest({ garageId: "33" })
  }, [])

  const columns: ColumnConfig<PlanType>[] = [
    {
      id: "description",
      header: "Descrição",
      format: (row) => (
        <div className="flex items-center gap-2">
          <Car size={16} />
          {row.description}
        </div>
      )
    },
    {
      id: "priceIncents",
      header: "Valor",
      format: (row) => {
        const currencyFormatter = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        })

        return <div className="flex items-center gap-2">{`R$ ${currencyFormatter.format(row.priceInCents / 100)}`}</div>
      }
    },
    { id: "totalVacancies", header: "Vagas" },
    {
      id: "active",
      header: "Status",
      format: (row) => (
        <div className="flex items-center gap-2">
          {row.active ? <Badge variant="secondary">Ativo</Badge> : <Badge>Inativo</Badge>}
        </div>
      )
    },
    {
      id: "actions",
      header: "Ações",
      format: (row) => (
        <Button variant="transparent" onClick={() => props.onOpenForm?.(row)}>
          <SquarePen size={16} />
        </Button>
      )
    }
  ]

  return (
    <div className="flex w-full border-t border-t-gray-tertiary ">
      <div className="w-[15%] bg-bg-primary rounded-tl-md border-r border-r-gray-tertiary">
        <div className="p-2 flex gap-2 border-l-4 bg-bg-secondary border-l-brand-tertiary rounded-tl-md">
          <CircleDollarSign />
          Planos
        </div>
      </div>
      <div className="flex flex-col gap-4 w-[85%] mt-2 pl-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">Planos Disponíveis</span>
          <Button variant="outline" onClick={() => props.onOpenForm?.()}>
            <Plus />
            Novo plano
          </Button>
        </div>
        {isLoading ? (
          <PlansTableSkeleton />
        ) : (
          <RoundedDataTable<PlanType> data={data || []} columns={columns} isPaginated={false} />
        )}
      </div>
    </div>
  )
}
