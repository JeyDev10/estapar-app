export type PlanType = {
  idGarage: number
  idPlan: number
  veichleType: number
  active: boolean
  amountDailyCancellationInCents: number
  description: string
  descriptionAvailable: string
  endValidity: string | null
  priceInCents: number
  startValidity: string
  totalVacancies: number
}
