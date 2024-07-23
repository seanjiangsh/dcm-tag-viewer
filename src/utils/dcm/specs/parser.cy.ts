import { DataSet, Element } from "dicom-parser";

import * as parser from "../parser";

describe("parser utility tests", () => {
  it('should get VR "UN" for unknown tag without VR', () => {
    const element: Element = {
      tag: "x00080011",
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

  it('should return test "AT" value', () => {
    const element: Element = {
      tag: "x00080011",
      vr: "AT",
      length: 4,
      dataOffset: 0,
    };
    const dataset = {
      attributeTag: (tag: string) => "Test AT value",
      numStringValues: (tag: string) => 1,
    } as unknown as DataSet;
    const result = parser.getValue(dataset, element);
    expect(result).eql(["Test AT value"]);
  });

  it('should return test "US" value', () => {
    const element: Element = {
      tag: "x00080011",
      vr: "US",
      length: 4,
      dataOffset: 0,
    };
    const dataset = {
      uint16: (tag: string, i: number) => {
        if (i === 0) return 1;
        return undefined;
      },
      numStringValues: (tag: string) => 2,
    } as unknown as DataSet;
    const result = parser.getValue(dataset, element);
    expect(result).eql([1]);
  });

  it('should return test "SS" value', () => {
    const element: Element = {
      tag: "x00080011",
      vr: "SS",
      length: 4,
      dataOffset: 0,
    };
    const dataset = {
      int16: (tag: string, i: number) => {
        if (i === 0) return 1;
        return undefined;
      },
      numStringValues: (tag: string) => 2,
    } as unknown as DataSet;
    const result = parser.getValue(dataset, element);
    expect(result).eql([1]);
  });

  it('should return test "UL" value', () => {
    const element: Element = {
      tag: "x00080011",
      vr: "UL",
      length: 4,
      dataOffset: 0,
    };
    const dataset = {
      uint32: (tag: string, i: number) => {
        if (i === 0) return 1;
        return undefined;
      },
      numStringValues: (tag: string) => 2,
    } as unknown as DataSet;
    const result = parser.getValue(dataset, element);
    expect(result).eql([1]);
  });

  it('should return test "SL" value', () => {
    const element: Element = {
      tag: "x00080011",
      vr: "SL",
      length: 4,
      dataOffset: 0,
    };
    const dataset = {
      int32: (tag: string, i: number) => {
        if (i === 0) return 1;
        return undefined;
      },
      numStringValues: (tag: string) => 2,
    } as unknown as DataSet;
    const result = parser.getValue(dataset, element);
    expect(result).eql([1]);
  });

  it('should return test "FL" value', () => {
    const element: Element = {
      tag: "x00080011",
      vr: "FL",
      length: 4,
      dataOffset: 0,
    };
    const dataset = {
      float: (tag: string, i: number) => {
        if (i === 0) return 1.1;
        return undefined;
      },
      numStringValues: (tag: string) => 2,
    } as unknown as DataSet;
    const result = parser.getValue(dataset, element);
    expect(result).eql([1.1]);
  });

  it('should return test "FD" value', () => {
    const element: Element = {
      tag: "x00080011",
      vr: "FD",
      length: 4,
      dataOffset: 0,
    };
    const dataset = {
      double: (tag: string, i: number) => {
        if (i === 0) return 1.1;
        return undefined;
      },
      numStringValues: (tag: string) => 2,
    } as unknown as DataSet;
    const result = parser.getValue(dataset, element);
    expect(result).eql([1.1]);
  });

  it('should return test "SQ" value', () => {
    const element: Element = {
      tag: "x00080011",
      vr: "SQ",
      length: 4,
      dataOffset: 0,
    };
    const dataset = {
      numStringValues: (tag: string) => 1,
    } as unknown as DataSet;
    const result = parser.getValue(dataset, element);
    expect(result).eql(undefined);
  });
});
