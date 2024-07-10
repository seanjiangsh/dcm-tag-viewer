import { useEffect, useState } from "react";
import { JSONPath } from "jsonpath-plus";
import { Alert, CircularProgress, Paper } from "@mui/material";

import { useDispatch } from "@redux/root-hook";
import { layoutActions } from "@redux/layout/reducer";
import { DcmJsonModelObj } from "@utils/dcm/dcmTypes";

import tableUtils from "@components/tree-table/utils";
import TreeTable from "@components/tree-table/Tree-table";
import * as tableTypes from "@components/tree-table/types";

const { setDrawerColumns, setEnabledColumns } = layoutActions;

const columnDef: tableTypes.ColumnDef = [
  { header: "Tag", accessorKey: "values.tagStr" },
  { header: "Name", accessorKey: "values.tagName" },
  { header: "VR", accessorKey: "values.vr", defaultDisabled: true },
  { header: "Values", accessorKey: "values.value" },
];
const PaperStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
};

type TagTableProps = { dcmJson: DcmJsonModelObj };

export default function TagTable(props: TagTableProps) {
  const { dcmJson } = props;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [tableData, setTableData] = useState<Array<tableTypes.Data>>([]);

  useEffect(() => {
    try {
      setIsLoading(true);
      const data = tableUtils.getTagData(dcmJson);
      setTableData(data);
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

  // const onRowDblClick = (data: tableTypes.Data) => {
  //   if (!dcmJson) return;
  //   const node = JSONPath({ json: dcmJson, path: data.key })[0];
  //   // console.log(data, node);
  // };

  const getElem = () => {
    if (hasError) {
      return (
        <Alert variant="outlined" severity="error" sx={{ m: "auto" }}>
          Load DICOM tag info failed
        </Alert>
      );
    } else if (isLoading) {
      return <CircularProgress sx={{ m: "auto" }} />;
    } else {
      return <TreeTable columnDef={columnDef} sourceData={tableData} />;
    }
  };
  return (
    <Paper id="TagTable" elevation={8} sx={PaperStyle}>
      {getElem()}
    </Paper>
  );
}
