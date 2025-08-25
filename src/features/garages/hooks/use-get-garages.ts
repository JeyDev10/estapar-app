"use client"
import { useState } from "react"

import { useService } from "@/src/services/use-service"
import { GarageType } from "@/src/domain/interfaces/garage"

import { useRequest } from "@/src/hooks/use-request"

export type RequestGaregesParams = {
  currentPage: number
  pageSize: number
  garageName?: string
}

export function useGetGarages() {
  const service = useService()

  const { handleRequest, data, error } = useRequest<RequestGaregesParams, GarageType>({
    request: (params) => service.get("/GetGaragesPaginatedList", { ...params })
  })

  return { handleRequest, data, error }
}
