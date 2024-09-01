import { ListItem, ListItemIcon, ListItemText, Switch } from "@mui/material";
import { ExpandMore, ChevronRight } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import {
  selectDrawer,
  selectExpandAll,
  selectFile,
} from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

const { setExpandAll } = layoutActions;

export default function ExpandSwitch() {
  const dispatch = useDispatch();
  const file = useSelector(selectFile);
  const expandAll = useSelector(selectExpandAll);
  const { filter } = useSelector(selectDrawer);
  const hasFilter = !!filter;
  const checked = expandAll && !hasFilter;

  const change = () => {
    if (hasFilter) return;
    dispatch(setExpandAll(!expandAll));
  };

  const expandIcon = checked ? (
    <ExpandMore fontSize="large" />
  ) : (
    <ChevronRight fontSize="large" />
  );

  return (
    file && (
      <ListItem id="Expand-switch">
        <ListItemIcon>{expandIcon}</ListItemIcon>
        <ListItemText primary={"Expand All"} />
        <Switch
          edge="end"
          disabled={hasFilter}
          checked={checked}
          onChange={change}
        />
      </ListItem>
    )
  );
}
