import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

export default function ImageViewDialog() {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  return (
    <Dialog id="ImageViewDialog" onClose={close} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Image Preview</DialogTitle>
      <IconButton
        onClick={close}
        sx={{
          position: "absolute",
          right: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent dividers>{/* TODO */}</DialogContent>
    </Dialog>
  );
}
