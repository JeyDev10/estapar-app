import { ERROR_MESSAGES } from "@/src/domain/constants/error-messages"

function handleAccessGaragesDetails() {
  cy.login(Cypress.env("testUsername"), Cypress.env("testPassword"))
  cy.intercept("https://mock.apidog.com/m1/1022746-0-default/GetGaragesPaginatedList*").as("getGarages")
  cy.intercept("https://mock.apidog.com/m1/1022746-0-default/plans*").as("getPlans")

  cy.visit("/garages")
  cy.wait("@getGarages")
  cy.get(".lucide-eye").first().parent("button").click()
  cy.wait("@getPlans")
  cy.get("button").contains("Novo plano").click()
  cy.get("h2").contains(/(Editar Plano|Novo Plano)/)
}

describe("Plans Form Tests", () => {
  beforeEach(() => {
    cy.login(Cypress.env("testUsername"), Cypress.env("testPassword"))
  })

  it("it should open the plans modal form", () => {
    handleAccessGaragesDetails()
  })

  it("should render all PlanForm fields", () => {
    handleAccessGaragesDetails()

    cy.get("input#description").should("exist")
    cy.get("label[for='active']").should("exist")
    cy.get("label[for='veichleType']").should("exist")
    cy.get("input#totalVacancies").should("exist")
    cy.get("input#planValue").should("exist")
    cy.get("input#cancelValue").should("exist")
    cy.get("label[for='startValidity']").should("exist")
    cy.get("label[for='endValidity']").should("exist")
  })

  it("should fill and submit the PlanForm successfully", () => {
    handleAccessGaragesDetails()

    cy.get("input#description").type("Plano Mensal Teste")
    cy.get("[for='active']").parent().find("button").click()
    cy.get("[for='veichleType']").parent().find("button").click()
    cy.get("[role='option']").contains("Carro").click()
    cy.get("input#totalVacancies").type("10")
    cy.get("input#planValue").clear().type("199")
    cy.get("input#cancelValue").clear().type("20")
    cy.get("[for='startValidity']").parent().find("button").click()
    cy.get(".rdp-day").contains("1").click()
    cy.get("[for='endValidity']").parent().find("button").click()
    cy.get(".rdp-day").contains("31").click()

    cy.get("button[type='submit']").click()
    cy.get("svg.lucide-circle-check").should("exist")
    cy.contains("sucesso", { matchCase: false })
  })
})

describe("Plan Form Field Validation Errors", () => {
  beforeEach(() => {
    handleAccessGaragesDetails()
  })

  it("should show error for empty description", () => {
    cy.get("button[type='submit']").click()
    cy.get("span.text-red-400").contains(ERROR_MESSAGES.STRING.DESCRIPTION_EMPTY).should("exist")
  })

  it("should show error for empty veichleType", () => {
    cy.get("button[type='submit']").click()
    cy.get("span.text-red-400").contains(ERROR_MESSAGES.NUMBER.VEHICLE_TYPE).should("exist")
  })

  it("should show error for empty totalVacancies", () => {
    cy.get("button[type='submit']").click()
    cy.get("span.text-red-400").contains(ERROR_MESSAGES.NUMBER.TOTAL_VACANCIES).should("exist")
  })

  it("should show error for incorrect planValue", () => {
    cy.get("input#planValue").clear().type("-10")
    cy.get("button[type='submit']").click()
    cy.get("span.text-red-400").contains(ERROR_MESSAGES.NUMBER.NON_NEGATIVE.PLAN_VALUE).should("exist")
  })

  it("should show error for incorrect cancelValue", () => {
    cy.get("input#cancelValue").clear().type("-1")
    cy.get("button[type='submit']").click()
    cy.get("span.text-red-400").contains(ERROR_MESSAGES.NUMBER.NON_NEGATIVE.CANCEL_VALUE).should("exist")
  })

  it("should show error for empty startValidity", () => {
    cy.get("button[type='submit']").click()
    cy.get("span.text-red-400").contains(ERROR_MESSAGES.DATE.INVALID_DATE).should("exist")
  })
})
