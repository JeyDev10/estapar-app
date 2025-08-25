"use client"
import { useState } from "react"

import { Building2, Building, MapPin, Users, Plus, CircleDollarSign } from "lucide-react"

import { PlansTable } from "@src/features/plans/containers/plans-table"

import { Button, Input, Switch } from "@src/components/ui"

import {
  Dialog as DialogComponent,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@src/components/ui/dialog/base/dialog"

import { PlanType } from "@/src/domain/interfaces/plans"

export type PlanFormProps = {
  plan?: PlanType
  onClose?(): void
  isCreateForm?: boolean
}

export function PlanForm(props: PlanFormProps) {
  const [showDialog, setShowDialog] = useState(true)

  function handleClose(show: boolean) {
    setShowDialog(show)
    if (!show) props.onClose?.()
  }

  return (
    <div className="z-6">
      <DialogComponent open={showDialog} onOpenChange={handleClose}>
        <DialogContent className="max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center font-extrabold text-2xl">Novo Plano</DialogTitle>
            <DialogDescription>Preencha os dados para criar um novo plano.</DialogDescription>
          </DialogHeader>
          <form className="grid grid-cols-2 gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="description">Descrição</label>
              <Input name="description" id="description" />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="active">Status</label>
              <Switch name="active" id="active" />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="description">Descrição</label>
              <Input name="description" id="description" />
            </div>
          </form>
          <DialogFooter>
            <DialogClose>Cancelar</DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogComponent>
    </div>
  )
}
