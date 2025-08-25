"use client"
import { useState } from "react"

import { useService } from "@/src/services/useService"
import { GarageType } from "@/src/domain/interfaces/garage"

export function useGetGarages() {
  const service = useService()

  const [data, setData] = useState<GarageType[]>()
  const [error, setError] = useState<unknown>()

  async function getGarages() {
    try {
      const response = await service.get("/GetGaragesPaginatedList", {
        currentPage: 2,
        pageSize: 10
      })

      const garages: GarageType[] = await response.json()

      setData(garages)
    } catch (error) {
      setError(error)
    }
  }

  return { handle: getGarages, data, error }
}
