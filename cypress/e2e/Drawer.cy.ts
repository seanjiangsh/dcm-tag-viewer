describe("Drawer E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should close the drawer when the close button is clicked", () => {
    // Open the drawer first
    cy.get("#Appbar-menu-button").click();
    cy.get("#Drawer").should("be.visible");

    // Click the close button inside the drawer, drawer should close
    cy.get("#Drawer-close-button").click();
    cy.get("#Drawer").should("not.be.visible");
  });

  it("should contain about button before dcm file is loaded", () => {
    // Open the drawer first
    cy.get("#Appbar-menu-button").click();
    cy.get("#Drawer").should("be.visible");

    // Assert About button is present
    cy.get("#Drawer").within(() => {
      cy.get("#About-button").should("exist");
    });
  });

  it("should contain control elements except SR switch after dcm file is loaded", () => {
    // Load a sample file first
    cy.fixture("MR.dcm", "binary").then((fileContent) => {
      cy.get("#FileDrop").attachFile(
        {
          fileContent,
          fileName: "MR.dcm",
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

    // Assert each component is present
    cy.get("#Drawer").within(() => {
      cy.get("#Search-input").should("exist");
      cy.get("#Column-switches").should("exist");
      cy.get("#Expand-switch").should("exist");
      cy.get("#ClearFile-button").should("exist");
      cy.get("#About-button").should("exist");
    });
  });

  it("should contain all control elements after SR file is loaded", () => {
    // Load a sample file first
    cy.fixture("SR.dcm", "binary").then((fileContent) => {
      cy.get("#FileDrop").attachFile(
        {
          fileContent,
          fileName: "SR.dcm",
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

    // Assert each component is present
    cy.get("#Drawer").within(() => {
      cy.get("#Search-input").should("exist");
      cy.get("#SR-switch").should("exist");
      cy.get("#Column-switches").should("exist");
      cy.get("#Expand-switch").should("exist");
      cy.get("#ClearFile-button").should("exist");
      cy.get("#About-button").should("exist");
    });
  });
});
