import tableUtils from "@components/tree-table/utils";
import SRTable from "../SR-table";

describe("SR-table component test", () => {
  it("should handle errors by setting hasError to true", () => {
    cy.stub(tableUtils, "getSRData").throws(new Error("Test error"));
    cy.mount(<SRTable dcmJson={{}} />);
    cy.contains("Load SR tag info failed").should("be.visible");
  });
});
