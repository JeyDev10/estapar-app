export type GarageType = {
  code: string
  name: string
  address: string
  city: string
  state: string
  region: string
}

export type GarageListResponse = {
  data: GarageType
  countRecords: number
  currentPage: number
  pageSize: number
  hasNextPage: number
  hasPreviousPage: number
}

export type GarageDetailsType = {
  subsidiary: string
  countSpaces: number
  occupiedSpaces: number
  maxDiscountPercent: number
} & GarageType
