import { ListItem, ListItemIcon, ListItemText, Switch } from "@mui/material";
import { Assignment } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import {
  selectFileData,
  selectIsSR,
  selectShowSR,
} from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

const { setExpandAll, setShowSR } = layoutActions;

export default function SRSwitch() {
  const dispatch = useDispatch();
  const fileData = useSelector(selectFileData);
  const isSR = useSelector(selectIsSR);
  const showSR = useSelector(selectShowSR);

  const onChange = () => {
    dispatch(setExpandAll(false));
    dispatch(setShowSR(!showSR));
  };

  return (
    fileData &&
    isSR && (
      <ListItem id="SR-switch">
        <ListItemIcon>
          <Assignment fontSize="large" />
        </ListItemIcon>
        <ListItemText primary={"SR Mode"} />
        <Switch edge="end" checked={showSR} onChange={onChange} />
      </ListItem>
    )
  );
}
