import * as decoder from "../decoder";

const sampleJapanBuffer = new Uint8Array([
  0xd4, 0xcf, 0xc0, 0xde, 0x5e, 0xc0, 0xdb, 0xb3, 0x3d, 0x1b, 0x24, 0x42, 0x3b,
  0x33, 0x45, 0x44, 0x1b, 0x28, 0x4a, 0x5e, 0x1b, 0x24, 0x42, 0x42, 0x40, 0x4f,
  0x3a, 0x1b, 0x28, 0x4a, 0x3d, 0x1b, 0x24, 0x42, 0x24, 0x64, 0x24, 0x5e, 0x24,
  0x40, 0x1b, 0x28, 0x4a, 0x5e, 0x1b, 0x24, 0x42, 0x24, 0x3f, 0x24, 0x6d, 0x24,
  0x26, 0x1b, 0x28, 0x4a,
]);

describe("decoder utility tests", () => {
  it("should return 'utf-8' for other locales", () => {
    cy.window().then((win) => {
      cy.stub(win.navigator, "language").get(() => "en-US");
      const result = decoder.getLangLabel();
      expect(result).eq("utf-8");
    });
  });

  it("should return 'big5' for locale 'zh-TW'", () => {
    cy.window().then((win) => {
      cy.stub(win.navigator, "language").get(() => "zh-TW");
      const result = decoder.getLangLabel();
      expect(result).eq("big5");
    });
  });

  it("should return 'gbk' for locale 'zh-CN'", () => {
    cy.window().then((win) => {
      cy.stub(win.navigator, "language").get(() => "zh-CN");
      const result = decoder.getLangLabel();
      expect(result).eq("gbk");
    });
  });

  it("should return 'shift-jis' for locale 'ja'", () => {
    cy.window().then((win) => {
      cy.stub(win.navigator, "language").get(() => "ja");
      const result = decoder.getLangLabel();
      expect(result).eq("shift-jis");
    });
  });

  it("should split the buffer into an array of Uint8Array", () => {
    const result = decoder.splitPN(sampleJapanBuffer);
    expect(result).to.have.length(3);

    const result0 = new Uint8Array([
      0xd4, 0xcf, 0xc0, 0xde, 0x5e, 0xc0, 0xdb, 0xb3,
    ]);
    const result1 = new Uint8Array([
      0x1b, 0x24, 0x42, 0x3b, 0x33, 0x45, 0x44, 0x1b, 0x28, 0x4a, 0x5e, 0x1b,
      0x24, 0x42, 0x42, 0x40, 0x4f, 0x3a, 0x1b, 0x28, 0x4a,
    ]);
    const result2 = new Uint8Array([
      0x1b, 0x24, 0x42, 0x24, 0x64, 0x24, 0x5e, 0x24, 0x40, 0x1b, 0x28, 0x4a,
      0x5e, 0x1b, 0x24, 0x42, 0x24, 0x3f, 0x24, 0x6d, 0x24, 0x26, 0x1b, 0x28,
      0x4a,
    ]);
    expect(result[0]).to.deep.equal(result0);
    expect(result[1]).to.deep.equal(result1);
    expect(result[2]).to.deep.equal(result2);
  });
});
