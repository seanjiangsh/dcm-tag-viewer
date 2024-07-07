import { useEffect, useState } from "react";
import { JSONPath } from "jsonpath-plus";
import { Alert, CircularProgress, Paper } from "@mui/material";

import { DcmJsonModelObj } from "@utils/dcm/dcmTypes";

import { useDispatch } from "@redux/root-hook";
import { layoutActions } from "@redux/layout/reducer";

import tableUtils from "@components/tree-table/utils";
import * as tableTypes from "@components/tree-table/types";
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

type SRTableProps = { dcmJson: DcmJsonModelObj };

export default function SRTable(props: SRTableProps) {
  const { dcmJson } = props;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [tableData, setTableData] = useState<Array<tableTypes.Data>>([]);
  const [expandData, setExpandData] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const data = tableUtils.getSRData(dcmJson);
      const expand = tableUtils.getSRInitExpands();
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

  // const onRowDblClick = (data: tableTypes.Data) => {
  //   if (!dcmJson) return;
  //   const { key, values } = data;
  //   const { valueKey } = values;
  //   const keyNode = JSONPath({ json: dcmJson, path: key })[0];
  //   const valNode = JSONPath({ json: dcmJson, path: valueKey })[0];
  //   // console.log({ data, keyNode, valNode });
  // };

  const getElem = () => {
    if (hasError) {
      return (
        <Alert variant="outlined" severity="error" sx={{ m: "auto" }}>
          Load SR tag info failed
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
        />
      );
    }
  };
  return (
    <Paper id="SRTable" elevation={8} sx={PaperStyle}>
      {getElem()}
    </Paper>
  );
}
