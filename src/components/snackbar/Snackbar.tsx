import { Alert, AlertColor, Snackbar as MuiSnackbar } from "@mui/material";

import { useDispatch, useSelector } from "@redux/root-hook";
import * as layoutSelectors from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

export default function Snackbar() {
  const dispatch = useDispatch();
  const snackbar = useSelector(layoutSelectors.selectSnackbar);
  const { opened, level, msg } = snackbar;
  const severity = level as AlertColor;

  const onClose = () => dispatch(layoutActions.clearSnackbar());

  return (
    <MuiSnackbar
      id="Snackbar"
      open={opened}
      autoHideDuration={5000}
      onClose={onClose}
    >
      <Alert severity={severity} elevation={6} variant="filled">
        {msg}
      </Alert>
    </MuiSnackbar>
  );
}
