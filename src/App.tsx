import Appbar from "@components/app-bar/Appbar";
import Main from "@components/main/Main";
import Drawer from "@components/drawer/Drawer";
import ImageViewDialog from "@components/image-view-dialog/Image-view-dialog";
import Snackbar from "@components/snackbar/Snackbar";

const ContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
} as const;

export default function App() {
  return (
    <div style={ContainerStyle}>
      <Appbar />
      <Main />
      <Drawer />
      <ImageViewDialog />
      <Snackbar />
    </div>
  );
}
