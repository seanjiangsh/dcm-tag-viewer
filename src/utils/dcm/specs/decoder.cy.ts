import { getLangLabel } from "../decoder";

describe("decoder utility tests", () => {
  it("should return 'utf-8' for other locales", () => {
    cy.window().then((win) => {
      cy.stub(win.navigator, "language").get(() => "en-US");
      const result = getLangLabel();
      expect(result).eq("utf-8");
    });
  });

  it("should return 'big5' for locale 'zh-TW'", () => {
    cy.window().then((win) => {
      cy.stub(win.navigator, "language").get(() => "zh-TW");
      const result = getLangLabel();
      expect(result).eq("big5");
    });
  });

  it("should return 'gbk' for locale 'zh-CN'", () => {
    cy.window().then((win) => {
      cy.stub(win.navigator, "language").get(() => "zh-CN");
      const result = getLangLabel();
      expect(result).eq("gbk");
    });
  });

  it("should return 'shift-jis' for locale 'ja'", () => {
    cy.window().then((win) => {
      cy.stub(win.navigator, "language").get(() => "ja");
      const result = getLangLabel();
      expect(result).eq("shift-jis");
    });
  });
});
