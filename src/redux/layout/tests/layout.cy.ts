import { initLayoutState } from "../default.state";
import * as LayoutTypes from "../types";
import { layoutReducer, layoutActions } from "../reducer";

describe("layout reducer tests", () => {
  it("should set the screen size", () => {
    const screenSize: LayoutTypes.ScreenSize = {
      windowSize: { width: 100, height: 100 },
      responsive: { deviceType: "desktop", direction: "landscape" },
    };
    const action = layoutActions.setScreenSize(screenSize);
    const newState = layoutReducer(initLayoutState, action);
    const expectedState = { ...screenSize, initialized: true };
    expect(newState.screenSize).to.deep.eq(expectedState);
  });

  it("should set the file data", () => {
    const mockData = {
      "00080016": {
        vr: "UI",
        Value: ["1.2.840.10008.5.1.4.1.1.88.33"],
      },
    };
    const action = layoutActions.setFileData(mockData);
    const newState = layoutReducer(initLayoutState, action);
    expect(newState.file.data).to.deep.eq(mockData);
  });

  it("should set the SR flag", () => {
    const isSR = true;
    const action = layoutActions.setIsSR(isSR);
    const newState = layoutReducer(initLayoutState, action);
    expect(newState.file.isSR).to.deep.eq(isSR);
  });

  it("should set the snackbar", () => {
    const snackbar = { opened: true, level: "info", msg: "message" };
    const action = layoutActions.setSnackbar(snackbar);
    const newState = layoutReducer(initLayoutState, action);
    expect(newState.snackbar).to.deep.eq(snackbar);
  });

  it("should clear the snackbar", () => {
    const snackbar = { opened: true, level: "info", msg: "message" };
    const action = layoutActions.clearSnackbar();
    const newState = layoutReducer({ ...initLayoutState, snackbar }, action);
    const expectedState = { opened: false, level: "info", msg: "" };
    expect(newState.snackbar).to.deep.eq(expectedState);
  });
});
