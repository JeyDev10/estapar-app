"use client"
import { useEffect, useState } from "react"

import { Building2, Building, MapPin, Users } from "lucide-react"

import { Button } from "@src/components/ui/button"
import {
  Dialog as DialogComponent,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@src/components/ui/dialog/base/dialog"
import { CountCard } from "@src/features/garages/components"

import { GarageType } from "@/src/domain/interfaces/garage"
import { cn } from "@/src/lib/utils"

export type GarageDetailsProps = {
  garage: GarageType
  onClose?(): void
}

//https://mock.apidog.com/m1/1022746-0-default/garage

async function getGarage(): Promise<GarageType | undefined> {
  const res = await fetch(`https://mock.apidog.com/m1/1022746-0-default/garage?garageId=78`, {
    headers: { "Content-Type": "application/json", authorization: "Bearer f5183967-b473-457d-953e-5a793b4919d3" }
  })
  const garageDetails: GarageType = await res.json()

  return garageDetails
}

export function GarageDetails(props: GarageDetailsProps) {
  const [showDialog, setShowDialog] = useState(true)

  async function handleGarages() {
    const testGarege = await getGarage()
    console.log(testGarege)
  }

  function handleClose(show: boolean) {
    setShowDialog(show)
    if (!show) props.onClose?.()
  }

  useEffect(() => {
    handleGarages()
  }, [])

  return (
    <DialogComponent open={showDialog} onOpenChange={handleClose}>
      <DialogContent className="max-w-[1280px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center font-extrabold text-2xl">
            <Building2 size={25} className="text-gray-primary" />
            {props.garage.name}
          </DialogTitle>
          <DialogDescription>{`Código: ${props.garage.code} - `}</DialogDescription>
          <div>
            <DialogDescription className="flex items-center gap-2 text-md">
              <MapPin size={16} />
              {props.garage.address}
            </DialogDescription>
            <DialogDescription className="flex items-center gap-2 text-md">
              <Building size={16} />
              {`Filial: ${props.garage.region} - ${props.garage.state}`}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="bg-bg-primary flex items-end pt-1 pl-0.5 rounded-tl-md rounded-tr-md">
            <div
              className={cn(
                "flex items-center justify-center",
                "bg-bg-secondary text-gray-primary",
                "rounded-tl-md rounded-tr-md p-2 border-b-2 border-b-brand-tertiary"
              )}
            >
              Mensalista Digital
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <CountCard label="Total de vagas" count={35} icon={<Users size={20} className="text-gray-secondary" />} />
          <CountCard label="Ocupadas" count={0} icon={<Users size={20} className="text-orange-500" />} />
          <CountCard label="Disponíveis" count={25} icon={<Users size={20} className="text-brand-tertiary" />} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="transparent">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </DialogComponent>
  )
}
