describe("File drop e2e tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("renders proper FileDrop elements", () => {
    cy.get('[id="FileDrop"]')
      .should("exist")
      .then(($el) => {
        // * file drop element should be in the foreground before file dropped
        const zIndex = $el.css("z-index");
        expect(zIndex).to.eq("10");
      });
  });

  it("renders proper FileDrop elements after file dropped", () => {
    cy.fixture("MR.dcm", "binary").then((fileContent) => {
      cy.get('[id="FileDrop"]').attachFile(
        {
          fileContent,
          fileName: "MR.dcm",
          mimeType: "application/dicom",
          encoding: "binary",
        },
        { subjectType: "drag-n-drop" }
      );
      cy.wait(1000);

      // * file drop element should be in the background before file dropped
      cy.get('[id="FileDrop"]').then(($el) => {
        const zIndex = $el.css("z-index");
        expect(zIndex).to.eq("-10");
      });

      cy.get('[id="TagTable"]').should("exist");
    });
  });
});
