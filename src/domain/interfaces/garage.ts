export type GarageType = {
  code: string
  name: string
  address: string
  city: string
  state: string
  region: string
}

export type GarageDetailsType = {
  subsidiary: string
  countSpaces: number
  occupiedSpaces: number
  maxDiscountPercent: number
} & GarageType
