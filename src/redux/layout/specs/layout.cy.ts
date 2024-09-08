import { initLayoutState } from "../default.state";
import * as LayoutTypes from "../types";
import { layoutReducer, layoutActions } from "../reducer";
import { ImageTypes } from "@utils/dcm/image-type";

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
    const mockData: LayoutTypes.File = {
      dcmJson: {
        "00080016": {
          vr: "UI",
          Value: ["1.2.840.10008.5.1.4.1.1.88.33"],
        },
      },
      dataset: {} as any,
      imageId: "file://testId",
      imageType: "default",
    };
    const action = layoutActions.setFile(mockData);
    const newState = layoutReducer(initLayoutState, action);
    expect(newState.file).to.deep.eq(mockData);
  });

  it("should set the show SR flag", () => {
    const showSR = true;
    const action = layoutActions.setShowSR(showSR);
    const newState = layoutReducer(initLayoutState, action);
    expect(newState.showSR).to.deep.eq(showSR);
  });

  it("should set the drawer opened flag", () => {
    const opened = true;
    const action = layoutActions.setDrawerOpened(opened);
    const newState = layoutReducer(initLayoutState, action);
    expect(newState.drawer.opened).to.deep.eq(opened);
  });

  it("should set the filter", () => {
    const filter = "filter";
    const action = layoutActions.setDrawerFilter(filter);
    const newState = layoutReducer(initLayoutState, action);
    expect(newState.drawer.filter).to.deep.eq(filter);
  });

  it("should set the drawer columns", () => {
    const columns = ["col1", "col2"];
    const action = layoutActions.setDrawerColumns(columns);
    const newState = layoutReducer(initLayoutState, action);
    expect(newState.drawer.columns).to.deep.eq(columns);
  });

  it("should set the enabled columns", () => {
    const columns = ["col1", "col2"];
    const action = layoutActions.setEnabledColumns(columns);
    const newState = layoutReducer(initLayoutState, action);
    expect(newState.enabledColumns).to.deep.eq(columns);
  });

  it("should set the expand all flag", () => {
    const expandAll = true;
    const action = layoutActions.setExpandAll(expandAll);
    const newState = layoutReducer(initLayoutState, action);
    expect(newState.expandAll).to.deep.eq(expandAll);
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
