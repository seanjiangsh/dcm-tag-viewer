import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { diff } from "deep-diff";

import { RootState } from "@redux/root-store";

import * as LayoutTypes from "./types";

import { initLayoutState } from "./default.state";
import { ImageTypes } from "@utils/dcm/image-type";

const resetLayoutState = () => initLayoutState;
const setScreenSize = (
  state: LayoutTypes.LayoutState,
  action: PayloadAction<LayoutTypes.ScreenSize>
) => {
  const { screenSize } = state;
  const newWindowSize = action.payload.windowSize;
  const newResponsive = action.payload.responsive;
  if (diff(screenSize.windowSize, newWindowSize)) {
    screenSize.initialized = true;
    screenSize.responsive = newResponsive;
    screenSize.windowSize = newWindowSize;
  }
};
const setFile = (
  state: LayoutTypes.LayoutState,
  action: PayloadAction<LayoutTypes.File>
) => {
  state.file = action.payload;
};
const setShowSR = (
  state: LayoutTypes.LayoutState,
  action: PayloadAction<boolean>
) => {
  state.showSR = action.payload;
};
const setDrawerOpened = (
  state: LayoutTypes.LayoutState,
  action: PayloadAction<boolean>
) => {
  state.drawer.opened = action.payload;
};
const setDrawerFilter = (
  state: LayoutTypes.LayoutState,
  action: PayloadAction<string>
) => {
  state.drawer.filter = action.payload;
};
const setDrawerColumns = (
  state: LayoutTypes.LayoutState,
  action: PayloadAction<Array<string>>
) => {
  state.drawer.columns = action.payload;
};
const setEnabledColumns = (
  state: LayoutTypes.LayoutState,
  action: PayloadAction<Array<string>>
) => {
  state.enabledColumns = action.payload;
};
const setExpandAll = (
  state: LayoutTypes.LayoutState,
  action: PayloadAction<boolean>
) => {
  state.expandAll = action.payload;
};
const setImageViewDialogOpened = (
  state: LayoutTypes.LayoutState,
  action: PayloadAction<boolean>
) => {
  state.imageViewDialog.opened = action.payload;
};
const setSnackbar = (
  state: LayoutTypes.LayoutState,
  action: PayloadAction<{ level: string; msg: string }>
) => {
  state.snackbar = { opened: true, ...action.payload };
};
const clearSnackbar = (state: LayoutTypes.LayoutState) => {
  const { level } = state.snackbar;
  state.snackbar = { opened: false, level, msg: "" };
};

const layoutSlice = createSlice({
  name: "layout",
  initialState: structuredClone(initLayoutState),
  reducers: {
    resetLayoutState,
    setScreenSize,
    setFile,
    setShowSR,
    setDrawerOpened,
    setDrawerFilter,
    setDrawerColumns,
    setEnabledColumns,
    setExpandAll,
    setImageViewDialogOpened,
    setSnackbar,
    clearSnackbar,
  },
});

export const selectLayout = (state: RootState) => state.layout;
export const layoutActions = layoutSlice.actions;
export const layoutReducer = layoutSlice.reducer;
