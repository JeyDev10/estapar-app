/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<any>
  }
}

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.intercept("/api/auth/session").as("getSession")

    cy.visit("/login")
    cy.get('input[name="username"]').type(username)
    cy.get('input[name="password"]').type(password)
    cy.get("form").submit()
    cy.wait("@getSession")
    cy.get("h4").should("be.visible")
  })
})

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("NEXT_REDIRECT")) {
    return false
  }
  return true
})
