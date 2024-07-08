describe("File drop e2e tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders proper FileDrop elements", () => {
    cy.get("#FileDrop")
      .should("exist")
      .then(($el) => {
        // * file drop element should be in the foreground before file dropped
        const zIndex = $el.css("z-index");
        expect(zIndex).to.eq("10");
      });

    cy.get("#FileDrop").contains("Drop the DICOM file here");
    cy.get("#FileDrop").contains("or");
    cy.get("#FileDrop").contains("Load a sample file");

    cy.get("#loadDefaultButton-MR").should("exist").contains("MRI (MR)");
    cy.get("#loadDefaultButton-DX").should("exist").contains("X-ray (DX)");
    cy.get("#loadDefaultButton-SR")
      .should("exist")
      .contains("Structured Report (SR)");
  });

  it("renders proper elements after file dropped", () => {
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

    // * file drop element should be in the background before file dropped
    cy.get("#FileDrop").then(($el) => {
      const zIndex = $el.css("z-index");
      expect(zIndex).to.eq("-10");
    });

    cy.get("#TagTable").should("exist");
  });

  it("render proper elements after DX sample file loaded", () => {
    cy.get("#loadDefaultButton-DX").click();
    cy.wait(1000);

    cy.get("#FileDrop").then(($el) => {
      const zIndex = $el.css("z-index");
      expect(zIndex).to.eq("-10");
    });
    cy.get("#TagTable").should("exist");
  });

  it("render failed to load dcm file message", () => {
    const opt: any = { subjectType: "drag-n-drop" };
    cy.get("#FileDrop").attachFile("nyancat.png", opt);
    cy.wait(1000);

    const failedMsg =
      "Failed to parse the file. Please check if it is a DICOM file.";
    cy.get("#Snackbar").contains(failedMsg);
  });
});
