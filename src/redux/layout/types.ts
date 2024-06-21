import * as CommonTypes from "@redux/common.types";

import { DcmJsonModelObj } from "@utils/dcm/dcmTypes";

export type LayoutState = {
  screenSize: ScreenSize;
  file: File;
  showSR: boolean;
  drawer: Drawer;
  snackbar: { opened: boolean; level: string; msg: string };
};

export type ScreenSize = {
  initialized?: boolean;
  windowSize: WindowSize;
  responsive: Responsive;
};

export type WindowSize = {
  width: number;
  height: number;
};

export type Responsive = {
  deviceType: CommonTypes.DeviceType;
  direction: "landscape" | "portrait";
};

export type File = {
  data?: DcmJsonModelObj;
  isSR: boolean;
};

export type Drawer = {
  opened: boolean;
};

export type Snackbar = { opened: boolean; level: string; msg: string };
