"use client"
import { useState, useEffect, useMemo } from "react"

import { Users } from "lucide-react"

import { PlansTable } from "@src/features/plans/containers/plans-table"
import { PlanForm } from "@src/features/plans/containers/plan-form"

import { CountCard } from "@src/features/garages/components"
import { CountCardsSkeleton } from "@src/features/garages/components/count-cards-skeleton"
import { GarageDetailsHeader } from "@src/features/garages/components/garage-details-header"

import { useGetGarage } from "@src/features/garages/hooks/use-get-garage-details"

import { GarageType } from "@/src/domain/interfaces/garage"
import { PlanType } from "@/src/domain/interfaces/plans"

import { Dialog as DialogComponent, DialogContent } from "@src/components/ui/dialog/base/dialog"
import { cn } from "@/src/lib/utils/style-utils"

export type GarageDetailsProps = {
  garage: GarageType
  onClose?(): void
}

export function GarageDetails(props: GarageDetailsProps) {
  const [showDialog, setShowDialog] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanType | undefined>()

  const { handleRequest, data, isLoading } = useGetGarage()

  function handleClose(show: boolean) {
    setShowDialog(show)
    if (!show) props.onClose?.()
  }

  function handleOpenPlanForm(plan?: PlanType) {
    if (plan) setSelectedPlan(plan)
    else setShowCreateForm(true)
  }

  function handleClosePlanForm() {
    setShowCreateForm(false)
    setSelectedPlan(undefined)
  }

  useEffect(() => {
    handleRequest({ id: props.garage.code })
  }, [])

  const countsMap = useMemo(() => {
    const totSpaces = data?.countSpaces || 0
    const occupiedSpaces = data?.occupiedSpaces || 0

    return [
      {
        label: "Total de vagas",
        count: totSpaces,
        icon: <Users size={20} className="text-gray-secondary" />
      },
      {
        label: "Ocupadas",
        count: occupiedSpaces,
        icon: <Users size={20} className="text-orange-500" />
      },
      {
        label: "Disponíveis",
        count: totSpaces - occupiedSpaces,
        icon: <Users size={20} className="text-brand-tertiary" />
      }
    ]
  }, [data?.countSpaces, data?.occupiedSpaces])

  return (
    <>
      <DialogComponent open={showDialog} onOpenChange={handleClose}>
        <DialogContent className="max-w-[1280] w-full">
          <GarageDetailsHeader
            name={props.garage.name}
            code={props.garage.code}
            address={props.garage.address}
            region={props.garage.region}
            state={props.garage.state}
          />
          <div className="gap-4">
            <div className="bg-bg-primary flex items-end pt-1 pl-0.5 rounded-tl-md rounded-tr-md">
              <div
                className={cn(
                  "flex items-center justify-center",
                  "bg-bg-secondary text-gray-primary",
                  "rounded-tl-md rounded-tr-md p-2 border-b-2 border-b-brand-tertiary"
                )}
              >
                Mensalista Digital
              </div>
            </div>
          </div>
          {isLoading ? (
            <CountCardsSkeleton />
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {countsMap.map((countItem, index) => {
                return (
                  <CountCard
                    key={`${countItem.label}-${index}`}
                    label={countItem.label}
                    count={countItem.count}
                    icon={countItem.icon}
                  />
                )
              })}
            </div>
          )}
          <PlansTable garageId={props.garage.code} onOpenForm={handleOpenPlanForm} />
        </DialogContent>
      </DialogComponent>
      {(selectedPlan || showCreateForm) && (
        <PlanForm plan={selectedPlan} isCreateForm={showCreateForm} onClose={handleClosePlanForm} />
      )}
    </>
  )
}
