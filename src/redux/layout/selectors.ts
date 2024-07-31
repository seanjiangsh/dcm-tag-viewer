import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@redux/root-store";

const selectLayout = (state: RootState) => state.layout;
const selectFile = (state: RootState) => state.layout.file;

export const selectFileData = createSelector(selectFile, (file) => file.data);

export const selectImageId = createSelector(selectFile, (file) => file.imageId);

export const selectIsSR = createSelector(selectFile, (file) => file.isSR);

export const selectShowSR = createSelector(
  selectLayout,
  (layout) => layout.showSR
);

export const selectDrawer = createSelector(
  selectLayout,
  (layout) => layout.drawer
);

export const selectEnabledColumns = createSelector(
  selectLayout,
  (layout) => layout.enabledColumns
);

export const selectExpandAll = createSelector(
  selectLayout,
  (layout) => layout.expandAll
);

export const selectImageViewDialog = createSelector(
  selectLayout,
  (layout) => layout.imageViewDialog
);

export const selectSnackbar = createSelector(
  selectLayout,
  (layout) => layout.snackbar
);
