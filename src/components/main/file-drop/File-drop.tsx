import { Dispatch, DragEventHandler, SetStateAction } from "react";
import { Box } from "@mui/material";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectFileData } from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";

import * as dcmParser from "@utils/dcm/parser";

import { SRDataUtil } from "@components/tree-table/utils";

const { resetLayoutState, setFileData, setIsSR, setShowSR, setSnackbar } =
  layoutActions;

const BoxStyle = (onTop: boolean) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.5rem",
  zIndex: onTop ? 10 : -10,
  backgroundColor: onTop ? "white" : "transparent",
});

type FileDropProps = {
  dragState: [boolean, Dispatch<SetStateAction<boolean>>];
};
export default function FileDrop(props: FileDropProps) {
  const { dragState } = props;
  const [dragging, setDragging] = dragState;

  const dispatch = useDispatch();
  const fileData = useSelector(selectFileData);

  const onTop = !fileData || dragging;

  const hint = dragging
    ? "Drop the DICOM file here..."
    : "Drag your DICOM file here";

  const fileDrop: DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    setDragging(false);
    dispatch(resetLayoutState());

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
    // console.log(dcmJson);
    dispatch(setFileData(dcmJson));
    if (isSR) {
      dispatch(setIsSR(isSR));
      dispatch(setShowSR(true));
    }
  };

  const contents = onTop ? hint : null;

  return (
    <Box sx={BoxStyle(onTop)} onDrop={fileDrop}>
      {contents}
    </Box>
  );
}
