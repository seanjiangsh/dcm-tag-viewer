describe("SR table e2e tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("renders proper SRTable elements", () => {
    cy.fixture("SR.dcm", "binary").then((fileContent) => {
      cy.get('[id="FileDrop"]').attachFile(
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

    cy.get('[id="SRTable"]').should("exist");
    cy.get('[id="SRTable"]').contains("Title");
    cy.get('[id="SRTable"]').contains("Value");
    cy.get('[id="SRTable"]').contains("Unit");
  });
});
