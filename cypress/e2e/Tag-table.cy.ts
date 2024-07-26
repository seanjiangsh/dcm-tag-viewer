describe("Tag table e2e tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders proper Tag-Table elements", () => {
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

    cy.get("#TagTable").should("exist");
    cy.get("#TagTable").contains("Tag");
    cy.get("#TagTable").contains("Name");
    cy.get("#TagTable").contains("Values");
  });

  it("double click the first row", () => {
    cy.get("#loadDefaultButton-MR").click();
    cy.wait(1000);
    cy.get("#TagTable").find("tbody tr").first().dblclick;
  });
});
