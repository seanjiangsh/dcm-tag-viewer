import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Preview } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectFileData, selectImageViewDialog } from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

const { setDrawerOpened, setImageViewDialogOpened } = layoutActions;

export default function ImageViewButton() {
  const dispatch = useDispatch();
  const fileData = useSelector(selectFileData);
  const { opened } = useSelector(selectImageViewDialog);

  const onClick = () => {
    dispatch(setImageViewDialogOpened(!opened));
    dispatch(setDrawerOpened(false));
  };

  return (
    fileData && (
      <ListItemButton
        id="Image-view-dialog-button"
        disabled={!fileData}
        onClick={onClick}
      >
        <ListItemIcon>
          <Preview fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="View Image" />
      </ListItemButton>
    )
  );
}