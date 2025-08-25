"use client"
import { useState } from "react"

import { Building2, Building, MapPin, Users, Plus, CircleDollarSign } from "lucide-react"

import { PlansTable } from "@src/features/plans/containers/plans-table"
import { PlanForm } from "@src/features/plans/containers/plan-form"

import { Button } from "@src/components/ui/button"
import {
  Dialog as DialogComponent,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@src/components/ui/dialog/base/dialog"
import { CountCard } from "@src/features/garages/components"

import { GarageType } from "@/src/domain/interfaces/garage"
import { cn } from "@/src/lib/utils"
import { PlanType } from "@/src/domain/interfaces/plans"

export type GarageDetailsProps = {
  garage: GarageType
  onClose?(): void
}

export function GarageDetails(props: GarageDetailsProps) {
  const [showDialog, setShowDialog] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanType | undefined>()

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

  return (
    <>
      {(selectedPlan || showCreateForm) && (
        <PlanForm plan={selectedPlan} isCreateForm={showCreateForm} onClose={handleClosePlanForm} />
      )}

      <DialogComponent open={showDialog} onOpenChange={handleClose}>
        <DialogContent className="max-w-[1280px]">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center font-extrabold text-2xl">
              <Building2 size={25} className="text-gray-primary" />
              {props.garage.name}
            </DialogTitle>
            <DialogDescription>{`Código: ${props.garage.code} - `}</DialogDescription>
            <div>
              <DialogDescription className="flex items-center gap-2 text-md">
                <MapPin size={16} />
                {props.garage.address}
              </DialogDescription>
              <DialogDescription className="flex items-center gap-2 text-md">
                <Building size={16} />
                {`Filial: ${props.garage.region} - ${props.garage.state}`}
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="grid gap-4">
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

          <div className="grid grid-cols-3 gap-4">
            <CountCard label="Total de vagas" count={35} icon={<Users size={20} className="text-gray-secondary" />} />
            <CountCard label="Ocupadas" count={0} icon={<Users size={20} className="text-orange-500" />} />
            <CountCard label="Disponíveis" count={25} icon={<Users size={20} className="text-brand-tertiary" />} />
          </div>
          <PlansTable onOpenForm={handleOpenPlanForm} />
        </DialogContent>
      </DialogComponent>
    </>
  )
}
