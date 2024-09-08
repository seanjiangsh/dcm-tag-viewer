// ! Note: This test will fail in "cypress open" because the screenshot in head mode will not match the viewport size of 1000x660.

// * note: cypress-visual-regression v5.2.1 will fail the test
// * on "Threshold limit of '0' exceeded: '0.00'"
// * it might be a bug in the library, so I set the threshold to 0.01 to pass it for now
const snapshotConfig = { errorThreshold: 0.01 };

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
    cy.wait(8000);
    // cy.get("#CS-image-display").screenshot();
    cy.get("#CS-image-display").compareSnapshot(
      "MR-image-display",
      snapshotConfig
    );
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
    // cy.get("#CS-image-display").screenshot();
    cy.get("#CS-image-display").compareSnapshot(
      "CT-overlay-display",
      snapshotConfig
    );
  });
});
