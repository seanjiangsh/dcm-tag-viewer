describe("App e2e tests", () => {
  it("renders proper App elements", () => {
    cy.visit("/").get("#Appbar").should("exist").get("#Main").should("exist");
  });
});
