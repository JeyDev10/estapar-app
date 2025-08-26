"use client"

const teste: PlanType = {
  idPlan: 255,
  idGarage: 1572,
  description: "Mensalista Carro",
  startValidity: "07/08/2025",
  endValidity: "25/08/2025",
  priceInCents: 5555,
  active: false,
  descriptionAvailable: "testando cadastro carro",
  amountDailyCancellationInCents: 5500,
  veichleType: 1,
  totalVacancies: 50
}
import { useService } from "@/src/services/use-service"
import { PlanType } from "@/src/domain/interfaces/plans"

import { useRequest } from "@/src/hooks/use-request"

export function useCreatePlan() {
  const service = useService()

  const { handleRequest, data, error, isLoading } = useRequest<any, PlanType>({
    request: (params) => service.post("/plan", { ...teste })
  })

  return { handleRequest, data, error }
}
