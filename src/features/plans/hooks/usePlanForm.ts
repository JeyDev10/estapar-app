import { useState } from "react"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useCreatePlan } from "@/src/features/plans/hooks/useCreatePlan"

import { PlanType } from "@/src/domain/interfaces/plans"

import { dateUtils } from "@/src/lib/utils/date-utils"

export type PlanFormType = Omit<PlanType, "amountDailyCancellationInCents" | "priceInCents"> & {
  planValue: string
  cancelValue: string
}

export type UsePlanFormProps = {
  plan?: PlanType
}

export function usePlanForm(props: UsePlanFormProps) {
  const [showSuccessMessage, setShowSusccessMessage] = useState(false)

  const { handleRequest, isLoading } = useCreatePlan({
    onSuccess() {
      setShowSusccessMessage(true)
    }
  })

  const planFormSchema = z.object({
    veichleType: z.coerce.number("Selecione um tipo de veículo."),
    active: z.boolean(),
    cancelValue: z.coerce
      .number("Adicione o valor do cancelamento. ")
      .nonnegative("O valor do cancelamento não pode ser negativo."),
    planValue: z.coerce
      .number("Adicione o valor do plano.")
      .nonnegative("O valor do cancelamento não pode ser negativo."),
    description: z.string("Adicione uma descrição").nonempty("Adicione uma descrição"),
    endValidity: z
      .string("Adicione uma data válida.")
      .refine(dateUtils.validateDateString, { error: "Adicione uma data válida." })
      .nullish(),
    startValidity: z.string().refine(dateUtils.validateDateString, { error: "Adicione uma data válida." }),
    totalVacancies: z.preprocess((val) => {
      if (typeof val === "string" && val.trim() === "") {
        return undefined
      }
      return val
    }, z.coerce.number("Adicione um total de vagas.").nonnegative("O total de vagas não pode ser negativo."))
  })

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<z.input<typeof planFormSchema>>({
    defaultValues: {
      ...props.plan,
      startValidity: props.plan?.startValidity ? new Date(props.plan.startValidity).toLocaleDateString() : undefined,
      endValidity: props.plan?.endValidity ? new Date(props.plan.endValidity).toLocaleDateString() : undefined,
      active: props.plan?.active ?? false,
      planValue: props.plan?.priceInCents ? (props.plan?.priceInCents / 100).toString() : 0,
      cancelValue: props.plan?.amountDailyCancellationInCents
        ? (props.plan?.amountDailyCancellationInCents / 100).toString()
        : 0
    },
    resolver: zodResolver(planFormSchema)
  })

  const onSubmit = async (formData: z.input<typeof planFormSchema>) => {
    try {
      const planObject: Omit<PlanType, "idPlan"> = {
        idGarage: props.plan?.idGarage ?? 0,
        description: formData.description,
        startValidity: formData.startValidity,
        endValidity: formData.endValidity ?? null,
        priceInCents: Number(formData.planValue) * 100,
        active: false,
        descriptionAvailable: "testando cadastro carro",
        amountDailyCancellationInCents: Number(formData.cancelValue) * 100,
        veichleType: Number(formData.veichleType),
        totalVacancies: Number(formData.totalVacancies)
      }

      await handleRequest(planObject)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    showSuccessMessage,
    errors,
    register,
    control,
    isLoading
  }
}
