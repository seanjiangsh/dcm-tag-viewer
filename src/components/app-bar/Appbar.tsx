import { MouseEventHandler, useState } from "react";
import {
  Button,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  Popover,
  Switch,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useDispatch, useSelector } from "@redux/root-hook";
import {
  selectFileData,
  selectIsSR,
  selectShowSR,
} from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

import { appBarHeight } from "@utils/theme";
import { Assignment, DeleteForever, Menu } from "@mui/icons-material";

const { setFileData, setIsSR, setShowSR } = layoutActions;

const AppBarStyle = { height: appBarHeight } as const;

// TODO: move filter, expand here?

export default function AppBar() {
  const dispatch = useDispatch();
  const fileData = useSelector(selectFileData);
  const isSR = useSelector(selectIsSR);
  const showSR = useSelector(selectShowSR);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const closeMenu = () => setMenuAnchor(null);
  const menuClick: MouseEventHandler<HTMLButtonElement> = (ev) =>
    setMenuAnchor(ev.currentTarget);
  const showSRChange = () => dispatch(setShowSR(!showSR));
  const clearFile = () => {
    dispatch(setShowSR(false));
    dispatch(setIsSR(false));
    dispatch(setFileData());
    closeMenu();
  };

  const srSwitch = (
    <ListItem>
      <ListItemIcon>
        <Assignment fontSize="large" />
      </ListItemIcon>
      <ListItemText primary={showSR ? "SR Mode" : "Tag Mode"} />
      <Switch
        edge="end"
        disabled={!fileData || !isSR}
        checked={showSR}
        onChange={showSRChange}
      />
    </ListItem>
  );

  const clearFileBtn = (
    <ListItemButton disabled={!fileData} onClick={clearFile}>
      <ListItemIcon>
        <DeleteForever fontSize="large" />
      </ListItemIcon>
      <ListItemText primary="Clear File" />
    </ListItemButton>
  );

  const popover = (
    <Popover
      anchorEl={menuAnchor}
      open={Boolean(menuAnchor)}
      onClose={closeMenu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <List sx={{ p: 2 }}>
        {fileData && isSR && srSwitch}
        {clearFileBtn}
      </List>
    </Popover>
  );

  const toolbar = (
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={menuClick}
      >
        <Menu />
      </IconButton>
      {!isMobile && (
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          DICOM Tag Viewer
        </Typography>
      )}
    </Toolbar>
  );

  return (
    <MuiAppBar id="AppBar" position="static" sx={AppBarStyle}>
      {toolbar}
      {popover}
    </MuiAppBar>
  );
}
