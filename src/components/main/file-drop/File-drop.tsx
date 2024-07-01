import {
  Dispatch,
  DragEventHandler,
  Fragment,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import { Box, Button, Typography } from "@mui/material";

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

  const [loadFileDelay, setLoadFileDelay] = useState(false);

  const onTop = !fileData || dragging;
  const showLoadSampleElems = !dragging && !fileData && !loadFileDelay;

  const parseAndSetFileData = async (data: File | Response) => {
    if (fileData) dispatch(resetLayoutState());
    const arrayBuffer = await data.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const dataset = await dcmParser.parseDcm(buffer);
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

  const fileDrop: DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    setDragging(false);
    setLoadFileDelay(true);
    setTimeout(() => setLoadFileDelay(false), 1000);

    const file = e.dataTransfer.files[0];
    parseAndSetFileData(file);
  };

  const loadDefaultFile: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const id = e.currentTarget.id;
    const type = id.split("-")[1];
    const response = await fetch(`/samples/${type}.dcm`);
    parseAndSetFileData(response);
  };

  const loadSampleElems = (
    <Fragment>
      <Typography variant="h5">or</Typography>
      <Typography variant="h5">Load a sample file</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, m: 1 }}>
        <Button
          fullWidth
          variant="contained"
          id="loadDefaultButton-MR"
          onClick={loadDefaultFile}
        >
          MRI (MR)
        </Button>
        <Button
          fullWidth
          variant="contained"
          id="loadDefaultButton-DX"
          onClick={loadDefaultFile}
        >
          X-ray (DX)
        </Button>
        <Button
          fullWidth
          variant="contained"
          id="loadDefaultButton-SR"
          onClick={loadDefaultFile}
        >
          Structured Report (SR)
        </Button>
      </Box>
    </Fragment>
  );

  const contents = onTop && (
    <Box style={{ textAlign: "center" }}>
      <Typography variant="h4">Drop the DICOM file here</Typography>
      {showLoadSampleElems && loadSampleElems}
    </Box>
  );

  return (
    <Box id="FileDrop" sx={BoxStyle(onTop)} onDrop={fileDrop}>
      {contents}
    </Box>
  );
}
