import { Paper } from "@mui/material";

import { useSelector } from "@redux/root-hook";
import { selectFileData, selectIsSR } from "@redux/layout/selectors";

import { appBarHeight } from "@utils/theme";

import FileDrop from "./file-drop/File-drop";
import TagTable from "./tag-table/Tag-table";
import SRTable from "./sr-table/SR-table";

const MainStyle = {
  height: `calc(100% - ${appBarHeight}px)`,
  display: "flex",
  flexDirection: "row",
  p: 1,
} as const;

export default function Main() {
  const fileData = useSelector(selectFileData);
  const isSR = useSelector(selectIsSR);
  // TODO: shouldShowSR by SR is true and SR switch is true
  const table = isSR ? <SRTable /> : <TagTable />;
  const main = fileData ? table : <FileDrop />;
  return <Paper sx={MainStyle}>{main}</Paper>;
}
