import { useEffect, useState } from "react";
import { JSONPath } from "jsonpath-plus";
import { Alert, CircularProgress, Paper } from "@mui/material";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectFileData } from "@redux/layout/selectors";
import { layoutActions } from "@redux/layout/reducer";
import * as tableTypes from "@components/tree-table/types";
import SRDataUtil from "@components/tree-table/utils/utils.sr-data";
import TreeTable from "@components/tree-table/Tree-table";

const { setDrawerColumns, setEnabledColumns } = layoutActions;

const columnDef: tableTypes.ColumnDef = [
  { header: "Title", accessorKey: "values.title" },
  { header: "Value", accessorKey: "values.value" },
  { header: "Unit", accessorKey: "values.unit" },
];
const PaperStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
};

export default function SRTable() {
  const dispatch = useDispatch();
  const dcmJson = useSelector(selectFileData);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  // const [dcmJson, setDcmJson] = useState<dcmTypes.DcmJsonModelObj>({});
  const [isSR, setIsSR] = useState(true);
  const [tableData, setTableData] = useState<Array<tableTypes.Data>>([]);
  const [expandData, setExpandData] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!dcmJson) return;
    try {
      const srUtil = new SRDataUtil(dcmJson);
      if (!srUtil.isSR()) {
        setIsSR(false);
        return;
      }
      const data = srUtil.getSRData();
      const expand = srUtil.getSRInitExpands();
      // console.log(data, expand);
      setTableData(data);
      setExpandData(expand);

      const allCols = columnDef.map((c) => c.header);
      const enabledCols = columnDef
        .filter((c) => !c.defaultDisabled)
        .map((c) => c.header);
      dispatch(setDrawerColumns(allCols));
      dispatch(setEnabledColumns(enabledCols));

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setHasError(true);
    }
  }, [dcmJson]);

  const onRowDblClick = (data: tableTypes.Data) => {
    if (!dcmJson) return;
    const { key, values } = data;
    const { valueKey } = values;
    const keyNode = JSONPath({ json: dcmJson, path: key })[0];
    const valNode = JSONPath({ json: dcmJson, path: valueKey })[0];
    // console.log({ data, keyNode, valNode });
  };

  const getElem = () => {
    if (!isSR) {
      return (
        <Alert variant="outlined" severity="warning" sx={{ m: "auto" }}>
          Not an SR instance
        </Alert>
      );
    } else if (hasError) {
      return (
        <Alert variant="outlined" severity="error" sx={{ m: "auto" }}>
          Load DICOM tag info failed
        </Alert>
      );
    } else if (isLoading) {
      return <CircularProgress sx={{ m: "auto" }} />;
    } else {
      return (
        <TreeTable
          columnDef={columnDef}
          sourceData={tableData}
          defaultExpand={expandData}
          onRowDblClick={onRowDblClick}
        />
      );
    }
  };
  return (
    <Paper elevation={8} sx={PaperStyle}>
      {getElem()}
    </Paper>
  );
}
