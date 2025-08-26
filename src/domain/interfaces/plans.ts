const teste: PlanType = {
  veichleType: 1,
  active: true,
  amountDailyCancellationInCents: 5500,
  description: "Mensalista Carro",
  descriptionAvailable: "",
  endValidity: null,
  idGarage: 1572,
  idPlan: 148,
  priceInCents: 38500,
  startValidity: "2025-07-28T21:00:00-03:00",
  totalVacancies: 50
}
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
