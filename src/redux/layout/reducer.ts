import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { diff } from "deep-diff";

import { RootState } from "@redux/root-store";

import * as LayoutTypes from "./types";

import { initLayoutState } from "./default.state";

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
const setFileData = (
  state: LayoutTypes.LayoutState,
  action: PayloadAction<LayoutTypes.File["data"]>
) => {
  state.file.data = action.payload;
};
const setIsSR = (
  state: LayoutTypes.LayoutState,
  action: PayloadAction<boolean>
) => {
  state.file.isSR = action.payload;
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
    setFileData,
    setIsSR,
    setSnackbar,
    clearSnackbar,
  },
});

export const selectLayout = (state: RootState) => state.layout;
export const layoutActions = layoutSlice.actions;
export const layoutReducer = layoutSlice.reducer;
