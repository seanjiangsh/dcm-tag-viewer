import tableUtils from "@components/tree-table/utils";
import TagTable from "../Tag-table";

describe("Tag-table component test", () => {
  it("should handle errors by setting hasError to true", () => {
    cy.stub(tableUtils, "getTagData").throws(new Error("Test error"));
    cy.mount(<TagTable dcmJson={{}} />);
    cy.contains("Load DICOM tag info failed").should("be.visible");
  });
});
