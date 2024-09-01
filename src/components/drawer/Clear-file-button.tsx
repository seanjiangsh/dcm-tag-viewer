import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectFile } from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

const { resetLayoutState, setDrawerOpened } = layoutActions;

export default function ClearFileButton() {
  const dispatch = useDispatch();
  const file = useSelector(selectFile);

  const close = () => dispatch(setDrawerOpened(false));

  const clearFile = () => {
    dispatch(resetLayoutState());
    close();
  };

  return (
    file && (
      <ListItemButton id="ClearFile-button" onClick={clearFile}>
        <ListItemIcon>
          <DeleteForever fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="Clear File" />
      </ListItemButton>
    )
  );
}
