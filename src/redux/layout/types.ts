import * as CommonTypes from "@redux/common.types";

import { DcmJsonModelObj } from "@utils/dcm/dcmTypes";

export type LayoutState = {
  screenSize: ScreenSize;
  file: File;
  snackbar: { opened: boolean; level: string; msg: string };
  showSR: boolean;
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

export type Snackbar = { opened: boolean; level: string; msg: string };
