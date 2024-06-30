import { useState } from "react";
import {
  Drawer as MuiDrawer,
  ListItemButton,
  ListItemIcon,
  List,
  ListItemText,
  Divider,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectDrawer } from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

import SearchInput from "./Search-input";
import SRSwitch from "./SR-switch";
import ColumnSwitches from "./Column-switches";
import ExpandSwitch from "./Expand-switch";
import ClearFileButton from "./ClearFileButton";
import About from "./About";

const { setDrawerOpened } = layoutActions;

export default function Drawer() {
  const dispatch = useDispatch();
  const { opened } = useSelector(selectDrawer);

  const close = () => dispatch(setDrawerOpened(false));

  return (
    <MuiDrawer
      id="Drawer"
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      open={opened}
      onClose={close}
    >
      <List sx={{ pt: 0, minWidth: 240 }}>
        <ListItemButton onClick={close}>
          <ListItemIcon>
            <ChevronLeft fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Close" />
        </ListItemButton>
        <Divider sx={{ mb: 1 }} />

        <SearchInput />
        <SRSwitch />
        <ColumnSwitches />
        <ExpandSwitch />
        <ClearFileButton />
        <About />
      </List>
    </MuiDrawer>
  );
}
