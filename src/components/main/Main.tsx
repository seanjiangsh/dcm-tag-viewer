import { Paper } from "@mui/material";

import { useSelector } from "@redux/root-hook";
import { selectFileData, selectShowSR } from "@redux/layout/selectors";

import { appBarHeight } from "@utils/theme";

import FileDrop from "./file-drop/File-drop";
import TagTable from "./tag-table/Tag-table";
import SRTable from "./sr-table/SR-table";

const MainStyle = {
  height: `calc(100% - ${appBarHeight}px)`,
  display: "flex",
  flexDirection: "row",
  p: 0.5,
} as const;

export default function Main() {
  const fileData = useSelector(selectFileData);
  const showSR = useSelector(selectShowSR);
  const table = showSR ? <SRTable /> : <TagTable />;
  const main = fileData ? table : <FileDrop />;

  return (
    <Paper id="Main" sx={MainStyle}>
      {main}
    </Paper>
  );
}
