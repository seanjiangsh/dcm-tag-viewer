describe("Image view", () => {
  beforeEach(() => {
    cy.viewport(1000, 660);
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
    cy.wait(8000);
    cy.compareSnapshot("MR-image-display");
  });

  it("should display CT overlay image properly", () => {
    // Load a sample file first
    cy.fixture("CT-overlay.dcm", "binary").then((fileContent) => {
      cy.get("#FileDrop").attachFile(
        {
          fileContent,
          fileName: "CT-overlay.dcm",
          mimeType: "application/dicom",
          encoding: "binary",
        },
        { subjectType: "drag-n-drop" }
      );
      cy.wait(1000);
    });

    // Open the drawer
    cy.get("#Appbar-menu-button").click();
    cy.get("#Drawer").should("be.visible");

    // Click the "View Image" button
    cy.get("#Image-view-dialog-button").click();
    cy.get("#Image-view-dialog").should("be.visible");

    // Check the image display
    cy.wait(8000);
    cy.compareSnapshot("CT-overlay-display");
  });
});
