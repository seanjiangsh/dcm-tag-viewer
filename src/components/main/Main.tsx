import { DragEventHandler, useState } from "react";
import { Box } from "@mui/material";

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
  // p: 0.5,
};

export default function Main() {
  const fileData = useSelector(selectFileData);
  const showSR = useSelector(selectShowSR);

  const dragState = useState(false);
  const [, setDragging] = dragState;

  const dragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const dragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const dragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const table = fileData ? showSR ? <SRTable /> : <TagTable /> : null;

  return (
    <Box
      id="Main"
      sx={MainStyle}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
    >
      <FileDrop dragState={dragState} />
      {table}
    </Box>
  );
}
