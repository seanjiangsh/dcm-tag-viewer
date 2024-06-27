describe("Main e2e tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("renders proper Main elements before file loaded", () => {
    cy.get('[id="Main"]').should("exist");
    cy.get('[id="FileDrop"]').should("exist");
  });
});
