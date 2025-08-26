import { Building2, Building, MapPin } from "lucide-react"

import { DialogDescription, DialogHeader, DialogTitle } from "@src/components/ui/dialog/base/dialog"

export type GarageDetailsHeaderProps = {
  name?: string
  code?: string
  address?: string
  region?: string
  state?: string
}

export function GarageDetailsHeader(props: GarageDetailsHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle className="flex gap-2 items-center font-extrabold text-2xl">
        <Building2 size={25} className="text-gray-primary" />
        {props.name}
      </DialogTitle>
      <DialogDescription>{`Código: ${props.code} - `}</DialogDescription>
      <div>
        <DialogDescription className="flex items-center gap-2 text-md">
          <MapPin size={16} />
          {props.address}
        </DialogDescription>
        <DialogDescription className="flex items-center gap-2 text-md">
          <Building size={16} />
          {`Filial: ${props.region} - ${props.state}`}
        </DialogDescription>
      </div>
    </DialogHeader>
  )
}
