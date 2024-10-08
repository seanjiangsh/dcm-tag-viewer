import { DataSet } from "dicom-parser";

import * as CommonTypes from "@redux/common.types";
import { DcmJsonModelObj } from "@utils/dcm/dcmTypes";
import { ImageTypes } from "@utils/dcm/image-type";

export type LayoutState = {
  screenSize: ScreenSize;
  file?: File;
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
  dcmJson: DcmJsonModelObj;
  dataset: DataSet;
  imageId: string;
  imageType: ImageTypes;
};

export type Drawer = {
  opened: boolean;
  filter: string;
  columns: Array<string>;
};

export type Snackbar = { opened: boolean; level: string; msg: string };
