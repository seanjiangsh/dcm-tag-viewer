describe("App e2e tests", () => {
  it("renders proper App elements", () => {
    cy.visit("/")
      .get('[id="Appbar"]')
      .should("exist")
      .get('[id="Main"]')
      .should("exist");
  });
});
