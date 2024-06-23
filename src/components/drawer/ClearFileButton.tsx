import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectFileData } from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

const { resetLayoutState, setDrawerOpened } = layoutActions;

export default function ClearFileButton() {
  const dispatch = useDispatch();
  const fileData = useSelector(selectFileData);

  const close = () => dispatch(setDrawerOpened(false));

  const clearFile = () => {
    dispatch(resetLayoutState());
    close();
  };

  return (
    fileData && (
      <ListItemButton disabled={!fileData} onClick={clearFile}>
        <ListItemIcon>
          <DeleteForever fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Clear File" />
      </ListItemButton>
    )
  );
}
