describe("Garage Page Tests", () => {
  beforeEach(() => {
    cy.login(Cypress.env("testUsername"), Cypress.env("testPassword"))
  })

  it("should display the garages page", () => {
    cy.visit("/")
    cy.get("div[data-slot='card']").click()
    cy.url().should("include", "/garages")
  })

  it("it should open the garage details modal", () => {
    cy.intercept("https://mock.apidog.com/m1/1022746-0-default/GetGaragesPaginatedList*").as("getGarages")

    cy.visit("/garages")
    cy.wait("@getGarages")
    cy.get(".lucide-eye").first().parent("button").click()
    cy.get("div[role='dialog']").should("be.visible")
  })
})
