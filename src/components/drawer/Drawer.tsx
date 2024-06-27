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

const { setDrawerOpened } = layoutActions;

export default function Drawer() {
  const dispatch = useDispatch();
  const { opened } = useSelector(selectDrawer);

  const close = () => dispatch(setDrawerOpened(false));

  return (
    <MuiDrawer
      id="Drawer"
      variant="temporary"
      open={opened}
      onClose={close}
      ModalProps={{ keepMounted: true }}
    >
      <List sx={{ pt: 0 }}>
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
      </List>
    </MuiDrawer>
  );
}
