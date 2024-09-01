import { ListItem, ListItemIcon, ListItemText, Switch } from "@mui/material";
import { Assignment } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectFile, selectShowSR } from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

const { setExpandAll, setShowSR } = layoutActions;

export default function SRSwitch() {
  const dispatch = useDispatch();
  const file = useSelector(selectFile);
  const isSR = file?.imageType === "SR";
  const showSR = useSelector(selectShowSR);

  const onChange = () => {
    dispatch(setExpandAll(false));
    dispatch(setShowSR(!showSR));
  };

  return (
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
