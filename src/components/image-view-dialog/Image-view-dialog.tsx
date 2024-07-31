import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Theme,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectImageViewDialog } from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

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

  const close = () => dispatch(setImageViewDialogOpened(false));

  return (
    <Dialog id="ImageViewDialog" onClose={close} open={opened}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Image View</DialogTitle>
      <IconButton onClick={close} sx={CloseButtonStyles}>
        <Close />
      </IconButton>
      <DialogContent dividers>TODO Image View</DialogContent>
    </Dialog>
  );
}
