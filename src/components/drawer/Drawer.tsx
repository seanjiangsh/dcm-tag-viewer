import {
  Drawer as MuiDrawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  List,
  ListItemText,
  Switch,
} from "@mui/material";
import { Assignment, DeleteForever } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import {
  selectDrawer,
  selectFileData,
  selectIsSR,
  selectShowSR,
} from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

const { setFileData, setIsSR, setShowSR } = layoutActions;

// TODO: move filter, expand here?

export default function Drawer() {
  const dispatch = useDispatch();
  const { opened } = useSelector(selectDrawer);
  const fileData = useSelector(selectFileData);
  const isSR = useSelector(selectIsSR);
  const showSR = useSelector(selectShowSR);

  const close = () => dispatch(layoutActions.setDrawerOpened(false));

  const showSRChange = () => dispatch(setShowSR(!showSR));

  const clearFile = () => {
    dispatch(setShowSR(false));
    dispatch(setIsSR(false));
    dispatch(setFileData());
    close();
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

  return (
    <MuiDrawer
      variant="temporary"
      open={opened}
      onClose={close}
      ModalProps={{ keepMounted: true }}
    >
      <List>
        {fileData && isSR && srSwitch}
        {clearFileBtn}
      </List>
    </MuiDrawer>
  );
}
