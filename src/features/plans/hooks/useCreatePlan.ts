"use client"
import { useService } from "@/src/services/use-service"
import { PlanType } from "@/src/domain/interfaces/plans"

import { useRequest } from "@/src/hooks/use-request"

export type useCreatePlanProps = {
  onSuccess?(): void
}

export function useCreatePlan({ onSuccess }: useCreatePlanProps) {
  const service = useService()

  const { handleRequest, data, error, isLoading } = useRequest<Omit<PlanType, "idPlan">, PlanType>({
    request: (params) => service.post("/plan", { ...params }),
    onSuccess
  })

  return { handleRequest, data, error, isLoading }
}
