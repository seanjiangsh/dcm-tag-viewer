import { DragEventHandler, useState } from "react";
import { Paper } from "@mui/material";

import { useDispatch } from "@redux/root-hook";
import { layoutActions } from "@redux/layout/reducer";
import * as dcmParser from "@utils/dcm/parser";

import { SRDataUtil } from "@components/tree-table/utils";

const { setFileData, setIsSR, setShowSR, setSnackbar } = layoutActions;

const PaperStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.5rem",
  m: 0.5,
};

export default function FileDrop() {
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);

  const hint = dragging
    ? "Drop the DICOM file here..."
    : "Drag your DICOM file here";

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

  const fileDrop: DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    const dataset = await dcmParser.parseDcm(file);
    if (!dataset) {
      const msg =
        "Failed to parse the file. Please check if it is a DICOM file.";
      dispatch(setSnackbar({ level: "error", msg }));
      return;
    }

    const dcmJson = dcmParser.getJson(dataset);
    const isSR = new SRDataUtil(dcmJson).isSR();
    dispatch(setFileData(dcmJson));
    if (isSR) {
      dispatch(setIsSR(isSR));
      dispatch(setShowSR(true));
    }
  };

  return (
    <Paper
      elevation={8}
      sx={PaperStyle}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
    >
      {hint}
    </Paper>
  );
}
