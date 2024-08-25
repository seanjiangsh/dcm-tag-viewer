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

  it("should correctly switch between SR/Tag table", () => {
    cy.get("#loadDefaultButton-SR").click();
    cy.wait(1000);

    // Open the drawer
    cy.get("#Appbar-menu-button").click();

    // Switch to Tag table
    cy.get('#SR-switch input[type="checkbox"]').click();
    cy.wait(500);

    // Check Tag table header
    cy.get("#TagTable")
      .find("thead tr")
      .within(() => {
        cy.get("th").eq(0).should("have.text", "Tag");
        cy.get("th").eq(1).should("have.text", "Name");
        cy.get("th").eq(2).should("have.text", "Values");
      });

    // Switch to SR table
    cy.get('#SR-switch input[type="checkbox"]').click();
    cy.wait(500);

    // Check SR table header first
    cy.get("#SRTable")
      .find("thead tr")
      .within(() => {
        cy.get("th").eq(0).should("have.text", "Title");
        cy.get("th").eq(1).should("have.text", "Value");
        cy.get("th").eq(2).should("have.text", "Unit");
      });
  });

  it("should show column switch 'At least one' warning", () => {
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
        .should("be.checked")
        .click();
      cy.get("#Column-switch-Name input[type='checkbox']")
        .should("exist")
        .should("be.checked")
        .click();
      cy.get("#Column-switch-Values input[type='checkbox']")
        .should("exist")
        .should("be.checked")
        .click()
        .should("be.checked"); // At least one column should be checked
    });
    const warningMsg = "At least one column must be enabled";
    cy.get("#Snackbar").contains(warningMsg);
  });

  it('should expand and collapse all rows when "Expand All" switch is clicked', () => {
    cy.get("#loadDefaultButton-MR").click();
    cy.wait(1000);

    // Should have 5 rows could be expanded
    cy.get(".collapsed-icon").should("have.length", 5);

    // Open the drawer
    cy.get("#Appbar-menu-button").click();

    // Expand all rows
    cy.get("#Expand-switch input[type='checkbox']").click();
    cy.wait(500);

    // Should have 5 rows could be collapsed
    cy.get(".expanded-icon").should("have.length", 5);

    // Collapse all rows
    cy.get("#Expand-switch input[type='checkbox']").click();
    cy.wait(500);

    // Should have 5 rows could be expanded
    cy.get(".collapsed-icon").should("have.length", 5);
  });

  it('should disable "Expand All" switch when search input is not empty', () => {
    cy.get("#loadDefaultButton-MR").click();
    cy.wait(1000);

    // Open the drawer
    cy.get("#Appbar-menu-button").click();

    // Type "Patient" in the search input
    cy.get("#Search-input").type("Patient").wait(500);
    cy.get("#Search-input").should("have.value", "Patient");

    // Try to expand all rows
    cy.get("#Expand-switch input[type='checkbox']").click({ force: true });
    cy.wait(500);

    // Expand switch should be disabled
    cy.get("#Expand-switch input[type='checkbox']").should("be.disabled");
  });

  it('should clear file and close drawer when "Clear File" button is clicked', () => {
    cy.get("#loadDefaultButton-MR").click();
    cy.wait(1000);

    // Open the drawer
    cy.get("#Appbar-menu-button").click();
    cy.get("#Drawer").should("be.visible");

    // Click the clear file button
    cy.get("#ClearFile-button").click();
    cy.wait(500);

    // Drawer should be closed
    cy.get("#Drawer").should("not.be.visible");

    // Check the Redux store
    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        const { file } = state.layout;
        expect(file).eql({});
      });

    // Check the FileDrop component is visible
    cy.get("#FileDrop").should("be.visible");
  });

  it('should render proper dialog when "About" button is clicked', () => {
    // Open the drawer first
    cy.get("#Appbar-menu-button").click();
    cy.get("#Drawer").should("be.visible");

    // Click the About button
    cy.get("#Drawer").within(() => {
      cy.get("#About-button").click();
    });

    // Dialog should be visible
    cy.get("#About").should("be.visible");

    // Dialog should contain proper content
    cy.get("#About").within(() => {
      cy.get("h2").should("have.text", "About");
      cy.get("p")
        .eq(0)
        .should(
          "have.text",
          "Thank you for using the DICOM Tag Viewer, which supports viewing tags and structured reports (SR). Rest assured, all data is processed locally in your browser, and no data is uploaded to any server."
        );
      cy.get("p")
        .eq(1)
        .should(
          "have.text",
          "This project is open-source. You can view the source code on GitHub and visit my portfolio website."
        );
      cy.get("a")
        .eq(0)
        .should("have.text", "source code")
        .should(
          "have.attr",
          "href",
          "https://github.com/seanjiangsh/dcm-tag-viewer"
        );
      cy.get("a")
        .eq(1)
        .should("have.text", "my portfolio")
        .should("have.attr", "href", "https://sean-j.dev");
    });

    // Close the dialog and drawer on click away
    cy.get("body").click(0, 0);
    cy.wait(500);

    // Dialog should be closed
    cy.get("#About").should("not.exist");

    // Drawer should be closed
    cy.get("#Drawer").should("not.be.visible");
  });
});
