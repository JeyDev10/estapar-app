"use client"

const teste: PlanType = {
  idPlan: 255,
  idGarage: 1572,
  description: "Mensalista Carro",
  startValidity: "2025-07-28T21:00:00-03:00",
  endValidity: null,
  priceInCents: 5555,
  active: false,
  descriptionAvailable: "testando cadastro carro",
  amountDailyCancellationInCents: 5500,
  VeichleType: 1,
  totalVacancies: 50
}
import { useService } from "@/src/services/use-service"
import { PlanType } from "@/src/domain/interfaces/plans"

import { useRequest } from "@/src/hooks/use-request"

export function useCreatePlan() {
  const service = useService()

  const { handleRequest, data, error } = useRequest<any, PlanType>({
    request: (params) => service.post("/plan", { ...teste })
  })

  return { handleRequest, data, error }
}
