describe("Image view", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should display MR image properly", () => {
    // Load a sample file first
    cy.get("#loadDefaultButton-MR").click();
    cy.wait(1000);

    // Open the drawer
    cy.get("#Appbar-menu-button").click();
    cy.get("#Drawer").should("be.visible");

    // Click the "View Image" button
    cy.get("#Image-view-dialog-button").click();
    cy.get("#Image-view-dialog").should("be.visible");

    // Check the image display
    cy.wait(3000);
    cy.compareSnapshot("MR-image-display");
  });
});
