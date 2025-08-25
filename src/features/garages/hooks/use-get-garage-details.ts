"use client"
import { useState } from "react"

import { useService } from "@/src/services/use-service"
import { GarageDetailsType } from "@/src/domain/interfaces/garage"

import { useRequest } from "@/src/hooks/use-request"

export function useGetGarage() {
  const service = useService()

  const { handleRequest, data, error } = useRequest<{ id: string }, GarageDetailsType>({
    request: (params) => service.get("/garage", { ...params })
  })
  return { handleRequest, data, error }
}
