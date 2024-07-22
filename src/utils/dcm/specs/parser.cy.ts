import dicomParser, { DataSet, Element } from "dicom-parser";

import * as parser from "../parser";

describe("parser utility tests", () => {
  it('should get VR "UN" for unknown tag', () => {
    const element: Element = {
      tag: "x00080011",
      vr: "UN",
      length: 4,
      dataOffset: 0,
    };
    const result = parser.getVR(element);
    expect(result).eq("UN");
  });

  it("should return empty object if element has no dataset", () => {
    const element: Element = {
      tag: "x00080011",
      vr: "UN",
      length: 4,
      dataOffset: 0,
    };
    const result = parser.getSQValue(element);
    expect(result).eql({});
  });
});
