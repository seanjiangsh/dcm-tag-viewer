import { ListItem, ListItemIcon, ListItemText, Switch } from "@mui/material";
import { ViewColumn } from "@mui/icons-material";

import { useDispatch, useSelector } from "@redux/root-hook";
import {
  selectDrawer,
  selectEnabledColumns,
  selectFileData,
} from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

const { setEnabledColumns, setSnackbar } = layoutActions;

export default function ColumnSwitches() {
  const dispatch = useDispatch();
  const fileData = useSelector(selectFileData);
  const allCols = useSelector(selectDrawer).columns;
  const enabledCols = useSelector(selectEnabledColumns);

  const switches = allCols.map((c) => {
    const checked = enabledCols.includes(c);
    const onChange = () => {
      const newCols = checked
        ? enabledCols.filter((ec) => ec !== c)
        : [...enabledCols, c];
      if (newCols.length === 0) {
        const msg = "At least one column must be enabled";
        dispatch(setSnackbar({ level: "warning", msg }));
        return;
      }
      dispatch(setEnabledColumns(newCols));
    };
    return (
      <ListItem>
        <ListItemIcon>
          <ViewColumn fontSize="large" />
        </ListItemIcon>
        <ListItemText primary={c} />
        <Switch edge="end" checked={checked} onChange={onChange} />
      </ListItem>
    );
  });

  return fileData && switches;
}
