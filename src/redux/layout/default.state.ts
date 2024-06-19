import * as LayoutTypes from "./types";

export const defaultScreenSize: LayoutTypes.ScreenSize = {
  windowSize: { width: 0, height: 0 },
  responsive: { deviceType: "desktop", direction: "landscape" },
};

export const initLayoutState: LayoutTypes.LayoutState = {
  screenSize: defaultScreenSize,
  snackbar: { opened: false, level: "info", msg: "" },
  showSR:false,
  file: { isSR: false },
};
