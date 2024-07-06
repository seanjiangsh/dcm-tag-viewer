describe("File drop e2e tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders proper FileDrop elements", () => {
    cy.get('[id="FileDrop"]')
      .should("exist")
      .then(($el) => {
        // * file drop element should be in the foreground before file dropped
        const zIndex = $el.css("z-index");
        expect(zIndex).to.eq("10");
      });

    cy.get('[id="FileDrop"]').contains("Drop the DICOM file here");
    cy.get('[id="FileDrop"]').contains("or");
    cy.get('[id="FileDrop"]').contains("Load a sample file");

    cy.get('[id="loadDefaultButton-MR"]').should("exist").contains("MRI (MR)");
    cy.get('[id="loadDefaultButton-DX"]')
      .should("exist")
      .contains("X-ray (DX)");
    cy.get('[id="loadDefaultButton-SR"]')
      .should("exist")
      .contains("Structured Report (SR)");
  });

  it("renders proper elements after file dropped", () => {
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

    // * file drop element should be in the background before file dropped
    cy.get('[id="FileDrop"]').then(($el) => {
      const zIndex = $el.css("z-index");
      expect(zIndex).to.eq("-10");
    });

    cy.get('[id="TagTable"]').should("exist");
  });

  it("render proper elements after DX sample file loaded", () => {
    cy.get('[id="loadDefaultButton-DX"]').click();
    cy.wait(1000);

    cy.get('[id="FileDrop"]').then(($el) => {
      const zIndex = $el.css("z-index");
      expect(zIndex).to.eq("-10");
    });
    cy.get('[id="TagTable"]').should("exist");
  });

  it("render failed to load dcm file message", () => {
    const opt: any = { subjectType: "drag-n-drop" };
    cy.get('[id="FileDrop"]').attachFile("nyancat.png", opt);
    cy.wait(1000);

    const failedMsg =
      "Failed to parse the file. Please check if it is a DICOM file.";
    cy.get('[id="Snackbar"]').contains(failedMsg);
  });
});
