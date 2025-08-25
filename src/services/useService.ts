"use client"

import { useSession } from "next-auth/react"

import Service from "@src/services/service"

export function useService() {
  const { data } = useSession()

  return new Service(data?.token || "")
}
