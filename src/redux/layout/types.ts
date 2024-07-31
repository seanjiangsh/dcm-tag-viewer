import * as CommonTypes from "@redux/common.types";

import { DcmJsonModelObj } from "@utils/dcm/dcmTypes";

export type LayoutState = {
  screenSize: ScreenSize;
  file: File;
  showSR: boolean;
  drawer: Drawer;
  enabledColumns: Array<string>;
  expandAll: boolean;
  imageViewDialog: { opened: boolean };
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
  imageId?: string;
  isSR: boolean;
};

export type Drawer = {
  opened: boolean;
  filter: string;
  columns: Array<string>;
};

export type Snackbar = { opened: boolean; level: string; msg: string };
