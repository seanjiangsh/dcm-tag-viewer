describe("App e2e tests", () => {
  it("renders proper App elements", () => {
    cy.visit("http://localhost:5173")
      .get('[id="Appbar"]')
      .should("exist")
      .get('[id="Main"]')
      .should("exist");
  });
});
