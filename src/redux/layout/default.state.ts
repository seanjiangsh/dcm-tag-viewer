import * as LayoutTypes from "./types";

export const defaultScreenSize: LayoutTypes.ScreenSize = {
  windowSize: { width: 0, height: 0 },
  responsive: { deviceType: "desktop", direction: "landscape" },
};

export const initLayoutState: LayoutTypes.LayoutState = {
  screenSize: defaultScreenSize,
  file: { isSR: false },
  showSR: false,
  enabledColumns: [],
  expandAll: false,
  drawer: { opened: false, filter: "", columns: [] },
  snackbar: { opened: false, level: "info", msg: "" },
};
