import { useState } from "react"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useCreatePlan } from "@src/features/plans/hooks/useCreatePlan"

import { PlanType } from "@src/domain/interfaces/plans"
import { ERROR_MESSAGES } from "@src/domain/constants/error-messages"

import { dateUtils } from "@src/lib/utils/date-utils"

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
    veichleType: z.coerce.number(ERROR_MESSAGES.NUMBER.VEHICLE_TYPE),
    active: z.boolean(),
    cancelValue: z.coerce
      .number(ERROR_MESSAGES.NUMBER.CANCEL_VALUE)
      .nonnegative(ERROR_MESSAGES.NUMBER.NON_NEGATIVE.CANCEL_VALUE),
    planValue: z.coerce
      .number(ERROR_MESSAGES.NUMBER.PLAN_VALUE)
      .nonnegative(ERROR_MESSAGES.NUMBER.NON_NEGATIVE.PLAN_VALUE),
    description: z.string(ERROR_MESSAGES.STRING.DESCRIPTION_EMPTY).nonempty(ERROR_MESSAGES.STRING.DESCRIPTION_EMPTY),
    endValidity: z
      .string(ERROR_MESSAGES.DATE.INVALID_DATE)
      .refine(dateUtils.validateDateString, { error: ERROR_MESSAGES.DATE.INVALID_DATE })
      .nullish(),
    startValidity: z
      .string(ERROR_MESSAGES.DATE.INVALID_DATE)
      .refine(dateUtils.validateDateString, { error: ERROR_MESSAGES.DATE.INVALID_DATE }),
    totalVacancies: z.preprocess((val) => {
      if (typeof val === "string" && val.trim() === "") {
        return undefined
      }
      return val
    }, z.coerce.number(ERROR_MESSAGES.NUMBER.TOTAL_VACANCIES).nonnegative(ERROR_MESSAGES.NUMBER.NON_NEGATIVE.TOTAL_VACANCIES))
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
