import { Fragment, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { useDispatch } from "@redux/root-hook";

import { layoutActions } from "@redux/layout/reducer";

const { setDrawerOpened } = layoutActions;

export default function About() {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);

  const open = () => setOpened(true);
  const close = () => {
    setOpened(false);
    dispatch(setDrawerOpened(false));
  };

  const dialog = (
    <Dialog id="About" open={opened} onClose={close}>
      <DialogTitle style={{ display: "flex", flexDirection: "row" }}>
        <Info fontSize="large" sx={{ mr: 2 }} />
        <Box sx={{ mt: "auto" }}>About</Box>
      </DialogTitle>

      <DialogContent dividers>
        <Typography gutterBottom>
          Hi this is Sean, the creator of this project. I'm a software engineer
          with a passion for medical imaging and healthcare technology. I built
          this project to provide a tool for viewing DICOM tags and structured
          reports. I hope you find this project useful. If you have any feedback
          or suggestions, please feel free to reach out to me. Thank you for
          using the DICOM Tag Viewer!
        </Typography>
        <br />
        <Typography>
          DICOM Tag Viewer process all data locally in your browser, no data is
          uploaded to any server. This project is open-source. You can view the
          source code on GitHub and visit my portfolio website.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          href="https://github.com/seanjiangsh/dcm-tag-viewer"
          target="_blank"
        >
          source code
        </Button>
        <Button variant="contained" href="https://sean-j.dev" target="_blank">
          my portfolio
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Fragment>
      <ListItemButton id="About-button" onClick={open}>
        <ListItemIcon>
          <Info fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItemButton>
      {dialog}
    </Fragment>
  );
}
