import { DragEventHandler, useState } from "react";
import { Box } from "@mui/material";

import { useSelector } from "@redux/root-hook";
import { selectFile, selectShowSR } from "@redux/layout/selectors";

import { appBarHeight } from "@utils/theme";

import FileDrop from "./file-drop/File-drop";
import TagTable from "./tag-table/Tag-table";
import SRTable from "./sr-table/SR-table";

const MainStyle = {
  height: `calc(100% - ${appBarHeight}px)`,
  display: "flex",
  flexDirection: "row",
};

export default function Main() {
  const file = useSelector(selectFile);
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
    // Check if the relatedTarget is a child of the current element
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;

    setDragging(false);
  };

  const TableElem = showSR ? SRTable : TagTable;
  const table = file ? <TableElem dcmJson={file.dcmJson} /> : null;

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
