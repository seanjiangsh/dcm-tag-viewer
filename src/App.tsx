import * as AppHooks from "@hooks/App.hooks";

import AppBar from "@components/app-bar/Appbar";
import Main from "@components/main/Main";
import Snackbar from "@components/snackbar/Snackbar";

const ContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
} as const;

export default function App() {
  AppHooks.useSetWindowSize();

  return (
    <div style={ContainerStyle}>
      <AppBar />
      <Main />
      <Snackbar />
    </div>
  );
}
