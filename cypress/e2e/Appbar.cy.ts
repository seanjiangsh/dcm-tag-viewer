describe("AppBar e2e tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders proper Appbar elements", () => {
    cy.get("#Appbar").should("exist").contains("DICOM Tag Viewer");

    const menuButton = cy.get("#appbar-drawer-menu");
    menuButton.should("exist");
  });

  it("opens the drawer when the menu button is clicked", () => {
    cy.get("#Drawer").should("not.exist");
    cy.get("#appbar-drawer-menu").click();
    cy.get("#Drawer").should("exist");
  });
});
