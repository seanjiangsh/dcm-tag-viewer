import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@redux/root-store";

const selectLayout = (state: RootState) => state.layout;

export const selectFileData = createSelector(
  selectLayout,
  (layout) => layout.file.data
);

export const selectIsSR = createSelector(
  selectLayout,
  (layout) => layout.file.isSR
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

export const selectSnackbar = createSelector(
  selectLayout,
  (layout) => layout.snackbar
);
