"use client"
import { Building2 } from "lucide-react"
import { useSession } from "next-auth/react"

import { GaragesTable } from "@src/features/garages/containers"
import { useEffect } from "react"

export default function Garages() {
  const session = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])
  return (
    <>
      <div>
        <div className="flex gap-4 items-center">
          <Building2 size={32} className="text-brand-primary" />
          <h1 className="text-3xl font-bold">Garagens</h1>
        </div>
        <span className="text-gray-secondary">Visualize as garagens habilitadas para mensalistas digitais.</span>
      </div>
      <GaragesTable />
    </>
  )
}
