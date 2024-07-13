describe("Drawer E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should close the drawer when the close button is clicked", () => {
    // Open the drawer first
    cy.get("#Appbar-menu-button").click();
    cy.get("#Drawer").should("be.visible");

    // Click the close button inside the drawer, drawer should close
    cy.get("#Drawer-close-button").click();
    cy.get("#Drawer").should("not.be.visible");
  });

  it("should contain about button before dcm file is loaded", () => {
    // Open the drawer first
    cy.get("#Appbar-menu-button").click();
    cy.get("#Drawer").should("be.visible");

    // Assert About button is present
    cy.get("#Drawer").within(() => {
      cy.get("#About-button").should("exist");
    });
  });

  it("should contain control elements switch after dcm file is loaded", () => {
    // Load a sample file first
    cy.get("#loadDefaultButton-MR").click();
    cy.wait(1000);

    // Open the drawer
    cy.get("#Appbar-menu-button").click();
    cy.get("#Drawer").should("be.visible");

    // Assert each component is present
    cy.get("#Drawer").within(() => {
      cy.get("#Search-input").should("exist");
      cy.get("#Column-switch-Tag input[type='checkbox']")
        .should("exist")
        .should("be.checked");
      cy.get("#Column-switch-Name input[type='checkbox']")
        .should("exist")
        .should("be.checked");
      cy.get("#Column-switch-VR input[type='checkbox']")
        .should("exist")
        .should("not.be.checked");
      cy.get("#Column-switch-Values input[type='checkbox']")
        .should("exist")
        .should("be.checked");
      cy.get("#Expand-switch input[type='checkbox']")
        .should("exist")
        .should("not.be.checked");
      cy.get("#SR-switch").should("not.exist");
      cy.get("#ClearFile-button").should("exist");
      cy.get("#About-button").should("exist");
    });
  });

  it("should contain all control elements after SR file is loaded", () => {
    // Load a sample file first
    cy.get("#loadDefaultButton-SR").click();
    cy.wait(1000);

    // Open the drawer
    cy.get("#Appbar-menu-button").click();
    cy.get("#Drawer").should("be.visible");

    // Assert each component is present
    cy.get("#Drawer").within(() => {
      cy.get("#Search-input").should("exist");
      cy.get("#SR-switch").should("exist");
      cy.get("#SR-switch input[type='checkbox']")
        .should("exist")
        .should("be.checked");
      cy.get("#Column-switch-Title input[type='checkbox']")
        .should("exist")
        .should("be.checked");
      cy.get("#Column-switch-Value input[type='checkbox']")
        .should("exist")
        .should("be.checked");
      cy.get("#Column-switch-Unit input[type='checkbox']")
        .should("exist")
        .should("be.checked");
      cy.get("#Expand-switch input[type='checkbox']")
        .should("exist")
        .should("not.be.checked");
      cy.get("#ClearFile-button").should("exist");
      cy.get("#About-button").should("exist");
    });
  });

  it("should has the proper search state after typing", () => {
    // Load a sample file first
    cy.get("#loadDefaultButton-MR").click();
    cy.wait(1000);

    // Open the drawer
    cy.get("#Appbar-menu-button").click();
    cy.get("#Drawer").should("be.visible");

    // Type "Patient" in the search input
    cy.get("#Search-input").type("Patient").wait(500);
    cy.get("#Search-input").should("have.value", "Patient");

    // Access the Redux store from the window object
    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        const { drawer } = state.layout;
        expect(drawer).to.have.property("filter", "Patient");
      });

    const tagTableData = [
      ["(0010,0010)", "PatientName", "anonymous"],
      ["(0010,0020)", "PatientID", "MR-xozYC2vTfc"],
      ["(0010,0032)", "PatientBirthTime", "000000"],
      ["(0010,0040)", "PatientSex", "F"],
      ["(0010,1010)", "PatientAge", "054Y"],
      ["(0010,1030)", "PatientWeight", "43"],
      ["(0010,21B0)", "AdditionalPatientHistory", ""],
      ["(0010,4000)", "PatientComments", ""],
      ["(0018,5100)", "PatientPosition", "HFS"],
      [
        "(0020,0032)",
        "ImagePositionPatient",
        "-127.67740252145, -160.54412870452, 112.53540630822",
      ],
      [
        "(0020,0037)",
        "ImageOrientationPatient",
        "0.99947261810302, 0.02601366117596, -0.0194367486983, -0.0232624839991, 0.99119043350219, 0.13038571178913",
      ],
      ["(0038,0500)", "PatientState", ""],
      ["(0040,1004)", "PatientTransportArrangements", ""],
    ];

    // TabTable has the proper data
    const tagTableRows = cy.get("#TagTable").find("tr");
    tagTableRows.should("have.length", 14);
    tagTableRows.each((row, rowIdx_from_1) => {
      row.find("td").each(function (cellIdx) {
        // `this` now refers to the current cell as a DOM element
        // Use jQuery's `text()` or `html()` method to get its content
        const cellContent = Cypress.$(this).text();
        const rowIdx = rowIdx_from_1 - 1;
        expect(cellContent).to.equal(tagTableData[rowIdx][cellIdx]);
      });
    });

    // Clear the search input
    cy.get("#Search-input").clear().wait(500);

    // check the filter value of Redux store
    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        const { drawer } = state.layout;
        expect(drawer).to.have.property("filter", "");
      });

    // TabTable should has all rows
    const tagTableRowsAfterClear = cy.get("#TagTable").find("tr");
    tagTableRowsAfterClear.should("have.length", 159);
  });

  it("should has the proper table header after column switchs changed", () => {
    cy.get("#loadDefaultButton-MR").click();
    cy.wait(1000);

    // Open the drawer
    cy.get("#Appbar-menu-button").click();
    cy.get("#Drawer").within(() => {
      cy.get("#Column-switch-VR input[type='checkbox']").click();
      cy.wait(500);
    });

    const tagTableHeader = cy.get("#TagTable").find("thead tr");
    tagTableHeader.should("have.length", 1);

    cy.get("#TagTable")
      .find("thead tr")
      .within(() => {
        cy.get("th").eq(0).should("have.text", "Tag");
        cy.get("th").eq(1).should("have.text", "Name");
        cy.get("th").eq(2).should("have.text", "VR");
        cy.get("th").eq(3).should("have.text", "Values");
      });
  });
});
