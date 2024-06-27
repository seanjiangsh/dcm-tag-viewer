describe("AppBar e2e tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("renders proper Appbar elements", () => {
    cy.get('[id="Appbar"]').should("exist").contains("DICOM Tag Viewer");

    const menuButton = cy.get('[aria-label="menu"]');
    menuButton.should("exist");
  });

  it("opens the drawer when the menu button is clicked", () => {
    cy.get('[id="Drawer"]').should("not.exist");
    cy.get('[aria-label="menu"]').click();
    cy.get('[id="Drawer"]').should("exist");
  });
});
