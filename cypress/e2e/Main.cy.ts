describe("Main e2e tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders proper Main elements before file loaded", () => {
    cy.get('[id="Main"]').should("exist");
    cy.get('[id="FileDrop"]').should("exist");
  });

  it("renders proper elements when triggering drag events after file loaded", () => {
    // * load a sample file first
    cy.get('[id="loadDefaultButton-DX"]').click();
    cy.wait(1000);

    // * file drop should be in the foreground when dragover
    cy.get('[id="Main"]').trigger("dragover");
    cy.wait(3000);
    cy.get('[id="FileDrop"]').then(($el) => {
      const zIndex = $el.css("z-index");
      expect(zIndex).to.eq("10");
    });
    cy.get('[id="FileDrop"]').contains("Drop the DICOM file here");

    // * file drop back to background again when dragleave (no file dropped)
    cy.get('[id="Main"]').trigger("dragleave");
    cy.wait(3000);
    cy.get('[id="FileDrop"]').then(($el) => {
      const zIndex = $el.css("z-index");
      expect(zIndex).to.eq("-10");
    });
  });
});
