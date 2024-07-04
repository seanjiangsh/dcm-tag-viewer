describe("Tag table e2e tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("renders proper SRTable elements", () => {
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
    });

    cy.get('[id="TagTable"]').should("exist");
    cy.get('[id="TagTable"]').contains("Tag");
    cy.get('[id="TagTable"]').contains("Name");
    cy.get('[id="TagTable"]').contains("Values");
  });
});
