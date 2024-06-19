import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: blueGrey[300],
      main: blueGrey[500],
      dark: blueGrey[700],
    },
    secondary: {
      light: blueGrey[500],
      main: blueGrey[700],
      dark: blueGrey[900],
    },
  },
});

export default theme;

export const appBarHeight = 64;
