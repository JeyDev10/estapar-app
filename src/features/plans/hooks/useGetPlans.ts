"use client"

import { useService } from "@/src/services/use-service"
import { PlanType } from "@/src/domain/interfaces/plans"

import { useRequest } from "@/src/hooks/use-request"

export type RequestPlansParams = {
  garageId: string
}

export function useGetPlans() {
  const service = useService()

  const { handleRequest, data, error } = useRequest<RequestPlansParams, PlanType[]>({
    request: (params) => service.get("/plans", { ...params })
  })

  return { handleRequest, data, error }
}
