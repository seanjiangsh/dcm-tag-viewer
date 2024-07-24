describe("Util Components", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders proper AlertWthBtn element", () => {
    cy.on("uncaught:exception", (error, runnable) => {
      // ignore the error if the error message is correct
      if (error.message.includes("allCols.map is not a function")) return false;
    });

    cy.window()
      .its("store")
      .invoke("dispatch", {
        type: "layout/setDrawerColumns",
        payload: { whatever: 1111 },
      });

    // should return to '/' after clicking the button
    cy.get("#Alert-with-button")
      .should("exist")
      .within(() => {
        cy.get("button").click();
      });
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
