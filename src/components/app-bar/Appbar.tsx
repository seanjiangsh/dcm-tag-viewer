import {
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectDrawer } from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

import { appBarHeight } from "@utils/theme";

const AppBarStyle = { height: appBarHeight } as const;

export default function AppBar() {
  const dispatch = useDispatch();
  const drawerOpened = useSelector(selectDrawer).opened;

  const menuClick = () =>
    dispatch(layoutActions.setDrawerOpened(!drawerOpened));

  return (
    <MuiAppBar id="Appbar" position="static" sx={AppBarStyle}>
      <Toolbar sx={AppBarStyle}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          id="appbar-drawer-menu"
          sx={{ mr: 2 }}
          onClick={menuClick}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          DICOM Tag Viewer
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
