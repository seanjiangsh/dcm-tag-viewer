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
import {
  selectImageViewDialog,
  selectImageId,
  selectImageType,
} from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

const CSImageDisplay = lazy(() => import("./CS-Image-display"));
const CSPDFDisplay = lazy(() => import("./CS-PDF-diaplay"));

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
  const imageType = useSelector(selectImageType);
  const imageId = useSelector(selectImageId);

  const close = () => dispatch(setImageViewDialogOpened(false));

  const displayElement = () => {
    if (!imageId) return null;
    console.log({ imageType, imageId });
    switch (imageType) {
      case "SR":
        return null;
      case "PDF":
        return <CSPDFDisplay imageId={imageId} />;
      default:
        return <CSImageDisplay imageId={imageId} />;
    }
  };

  return (
    <Dialog
      id="Image-view-dialog"
      maxWidth={false}
      onClose={close}
      open={opened}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>Image View</DialogTitle>
      <IconButton aria-hidden={true} onClick={close} sx={CloseButtonStyles}>
        <Close />
      </IconButton>
      <DialogContent dividers sx={{ p: 0, border: 0 }}>
        <Suspense fallback={LoadingElement}>{displayElement()}</Suspense>
      </DialogContent>
    </Dialog>
  );
}

const LoadingElement = (
  <div
    style={{
      width: "80dvw",
      height: "70dvh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress />
  </div>
);
