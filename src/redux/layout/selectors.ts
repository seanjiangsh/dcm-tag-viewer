import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@redux/root-store";

const selectLayout = (state: RootState) => state.layout;

export const selectFile = createSelector(selectLayout, (layout) => layout.file);

export const selectDcmJson = createSelector(
  selectFile,
  (file) => file?.dcmJson
);

export const selectDataset = createSelector(
  selectFile,
  (file) => file?.dataset
);

export const selectImageId = createSelector(
  selectFile,
  (file) => file?.imageId
);

export const selectImageType = createSelector(
  selectFile,
  (file) => file?.imageType
);

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
