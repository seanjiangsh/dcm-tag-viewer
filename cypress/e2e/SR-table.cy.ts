describe("SR table e2e tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders proper SRTable elements", () => {
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

    cy.get("#SRTable").should("exist");
    cy.get("#SRTable").contains("Title");
    cy.get("#SRTable").contains("Value");
    cy.get("#SRTable").contains("Unit");
  });
});
