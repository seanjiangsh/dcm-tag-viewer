import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Preview } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectFile, selectImageViewDialog } from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

const { setDrawerOpened, setImageViewDialogOpened } = layoutActions;

export default function ImageViewButton() {
  const dispatch = useDispatch();
  const file = useSelector(selectFile);
  const { opened } = useSelector(selectImageViewDialog);

  const couldShowImage = file?.imageType !== "SR";

  const onClick = () => {
    dispatch(setImageViewDialogOpened(!opened));
    dispatch(setDrawerOpened(false));
  };

  return (
    couldShowImage && (
      <ListItemButton id="Image-view-dialog-button" onClick={onClick}>
        <ListItemIcon>
          <Preview fontSize="large" />
        </ListItemIcon>
        <ListItemText primary="View Image" />
      </ListItemButton>
    )
  );
}
