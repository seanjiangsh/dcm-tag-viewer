import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@redux/root-store";

const selectLayout = (state: RootState) => state.layout;

export const selectScreenSize = createSelector(
  selectLayout,
  (layout) => layout.screenSize
);

export const selectFileData = createSelector(
  selectLayout,
  (layout) => layout.file.data
);

export const selectIsSR = createSelector(
  selectLayout,
  (layout) => layout.file.isSR
);

export const selectSnackbar = createSelector(
  selectLayout,
  (layout) => layout.snackbar
);
