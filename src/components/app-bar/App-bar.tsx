import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";

import { appBarHeight } from "@utils/theme";

export default function AppBar() {
  // TODO: Add a switch to change SRTable and TagTable if it's SR
  return (
    <MuiAppBar position="static" sx={{ height: appBarHeight }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          DICOM Tag Viewer
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
