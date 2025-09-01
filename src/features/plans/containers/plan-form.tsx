"use client"
import { useState } from "react"

import { LoaderCircle } from "lucide-react"
import { Controller } from "react-hook-form"

import { Button, Input, Switch, Select, DatePicker } from "@src/components/ui"
import {
  Dialog as DialogComponent,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@src/components/ui/dialog/base/dialog"
import { SuccessStatus } from "@src/features/plans/components/success-status"

import { PlanType } from "@/src/domain/interfaces/plans"

import { usePlanForm } from "@src/features/plans/hooks/usePlanForm"

export type PlanFormType = Omit<PlanType, "amountDailyCancellationInCents" | "priceInCents"> & {
  planValue: string
  cancelValue: string
}

export type PlanFormProps = {
  plan?: PlanType
  onClose?(): void
  isCreateForm?: boolean
}

export function PlanForm(props: PlanFormProps) {
  const [showDialog, setShowDialog] = useState(true)

  const { register, control, isLoading, handleSubmit, showSuccessMessage, errors } = usePlanForm({ plan: props?.plan })

  function onDialogChange(show: boolean) {
    setShowDialog(show)
    if (!show) props.onClose?.()
  }

  return (
    <div className="z-6">
      <DialogComponent open={showDialog} onOpenChange={onDialogChange}>
        <DialogContent className="max-w-[600px] w-[400px] md:w-[600px] min-h-[30vh]">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center font-extrabold text-2xl">
              {props.plan ? "Editar Plano" : "Novo Plano"}
            </DialogTitle>
            {!showSuccessMessage && <DialogDescription>Preencha os dados para criar um novo plano.</DialogDescription>}
          </DialogHeader>
          {showSuccessMessage ? (
            <SuccessStatus />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gird-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="description">Descrição</label>
                  <Input id="description" {...register("description")} aria-invalid={!!errors.description} />
                  {errors.description && <span className="text-sm text-red-400">{errors.description.message}</span>}
                </div>
                <div className="flex flex-col w-full">
                  <Controller
                    control={control}
                    name="active"
                    render={({ field: { onChange, value } }) => (
                      <>
                        <label htmlFor="active">Status</label>
                        <div className="flex items-center gap-2 h-[40px]">
                          <Switch onCheckedChange={onChange} checked={value} />
                          {value ? (
                            <span className="text-brand-primary">Ativo</span>
                          ) : (
                            <span className="text-gray-secondary">Inativo</span>
                          )}
                        </div>
                      </>
                    )}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <Controller
                    control={control}
                    name="veichleType"
                    render={({ field: { onChange, value } }) => (
                      <>
                        <label htmlFor="veichleType">Tipo de Veículo</label>
                        <Select
                          onSelectValue={onChange}
                          selectedValue={value?.toString()}
                          defaultValue={props.plan?.veichleType?.toString()}
                          options={[
                            { label: "Carro", value: "1" },
                            { label: "Moto", value: "2" }
                          ]}
                          isInvalid={!!errors.veichleType}
                        />
                        {errors.veichleType && (
                          <span className="text-sm text-red-400">{errors.veichleType.message}</span>
                        )}
                      </>
                    )}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="totalVacancies">Total de Vagas</label>
                  <Input
                    type="number"
                    id="totalVacancies"
                    {...register("totalVacancies")}
                    aria-invalid={!!errors.totalVacancies}
                  />
                  {errors.totalVacancies && (
                    <span className="text-sm text-red-400">{errors.totalVacancies.message}</span>
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="planValue">Valor (R$)</label>
                  <Input id="planValue" {...register("planValue")} type="number" />
                  {errors.planValue && <span className="text-sm text-red-400">{errors.planValue.message}</span>}
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="cancelValue">Valor do Cancelamento</label>
                  <Input id="cancelValue" {...register("cancelValue")} type="number" />
                  {errors.cancelValue && <span className="text-sm text-red-400">{errors.cancelValue.message}</span>}
                </div>
                <div className="flex flex-col w-full">
                  <Controller
                    control={control}
                    name="startValidity"
                    render={({ field: { onChange } }) => (
                      <>
                        <label htmlFor="startValidity">Início da Validade</label>
                        <DatePicker
                          defaultValue={props?.plan?.startValidity ? new Date(props?.plan?.startValidity) : undefined}
                          name="startValidity"
                          id="startValidity"
                          onChangeDate={onChange}
                          isInvalid={!!errors.startValidity}
                        />
                        {errors.startValidity && (
                          <span className="text-sm text-red-400">{errors.startValidity.message}</span>
                        )}
                      </>
                    )}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <Controller
                    control={control}
                    name="endValidity"
                    render={({ field: { onChange } }) => (
                      <>
                        <label htmlFor="endValidity">Fim da Validade</label>
                        <DatePicker
                          name="endValidity"
                          id="endValidity"
                          defaultValue={props?.plan?.endValidity ? new Date(props?.plan?.endValidity) : undefined}
                          onChangeDate={onChange}
                          isInvalid={!!errors.endValidity}
                        />
                        {errors.endValidity && (
                          <span className="text-sm text-red-400">{errors.endValidity.message}</span>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="flex items-end justify-end mt-4 gap-4">
                <Button onClick={() => onDialogChange(false)} variant="input" disabled={isLoading}>
                  Cancelar
                </Button>
                <Button disabled={isLoading} type="submit">
                  {isLoading ? <LoaderCircle className="animate-spin" /> : "Criar"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </DialogComponent>
    </div>
  )
}
