import { ListItem, ListItemIcon, ListItemText, Switch } from "@mui/material";
import { ExpandMore, ChevronRight } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectExpandAll, selectFileData } from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

const { setExpandAll } = layoutActions;

export default function ExpandSwitch() {
  const dispatch = useDispatch();
  const fileData = useSelector(selectFileData);
  const expandAll = useSelector(selectExpandAll);

  const change = () => dispatch(setExpandAll(!expandAll));

  const expandIcon = expandAll ? (
    <ExpandMore fontSize="large" />
  ) : (
    <ChevronRight fontSize="large" />
  );

  return (
    fileData && (
      <ListItem>
        <ListItemIcon>{expandIcon}</ListItemIcon>
        <ListItemText primary={"Expand All"} />
        <Switch edge="end" checked={expandAll} onChange={change} />
      </ListItem>
    )
  );
}
