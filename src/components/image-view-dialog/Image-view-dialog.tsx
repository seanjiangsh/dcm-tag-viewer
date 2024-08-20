import { lazy, Suspense } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Theme,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectImageViewDialog, selectImageId } from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

const CSImageDisplay = lazy(() => import("./CS-Image-display"));

const { setImageViewDialogOpened } = layoutActions;

const CloseButtonStyles = (theme: Theme) => ({
  position: "absolute",
  top: 12,
  right: 8,
  color: () => theme.palette.grey[500],
});

export default function ImageViewDialog() {
  const dispatch = useDispatch();
  const { opened } = useSelector(selectImageViewDialog);
  const imageId = useSelector(selectImageId);

  const close = () => dispatch(setImageViewDialogOpened(false));

  return (
    <Dialog id="ImageViewDialog" maxWidth={false} onClose={close} open={opened}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Image View</DialogTitle>
      <IconButton aria-hidden={true} onClick={close} sx={CloseButtonStyles}>
        <Close />
      </IconButton>
      <DialogContent dividers sx={{ p: 0, border: 0 }}>
        <Suspense fallback={<CircularProgress />}>
          <CSImageDisplay imageId={imageId} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
