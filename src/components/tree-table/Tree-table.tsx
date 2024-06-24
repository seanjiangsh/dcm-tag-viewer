import React, { useState, useEffect, useMemo } from "react";
import {
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  Row,
} from "@tanstack/react-table";
import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import utils from "./utils";
import * as types from "./types";
import * as styles from "./styles";
import { useSelector } from "@redux/root-hook";
import {
  selectDrawer,
  selectEnabledColumns,
  selectExpandAll,
} from "@redux/layout/selectors";

export default function TreeTable(props: types.TreeTableProps) {
  const { sourceData, columnDef, defaultExpand, onRowDblClick } = props;

  const { filter } = useSelector(selectDrawer);
  const enabledCols = useSelector(selectEnabledColumns);
  const expandAll = useSelector(selectExpandAll);

  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState<Array<types.Data>>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const getExpand = async (data: Array<types.Data>) =>
    defaultExpand && !filter
      ? defaultExpand
      : await utils.getFilterExpand(data, filter);

  useEffect(() => {
    if (hasError || sourceData.length < 1) return;
    console.time("Sorting table data");
    utils
      .getTableData(sourceData, filter)
      .then(async (tableData) => {
        const expandData = await getExpand(tableData);
        setData(tableData);
        setExpanded(expandData);
        // console.log(sourceData, tableData, expandData, enabledCols);
      })
      .catch((err) => {
        console.error(err);
        setHasError(true);
      });
    console.timeEnd("Sorting table data");
  }, [filter, hasError]);

  useEffect(() => {
    if (expandAll) setExpanded(true);
    else getExpand(data).then(setExpanded);
  }, [expandAll]);

  useEffect(() => {
    return () => {
      setHasError(false);
      setData([]);
      setExpanded({});
      console.log("TreeTable unmount");
    };
  }, []);

  const columns: Array<ColumnDef<types.Data>> = useMemo(() => {
    return columnDef
      .filter((c) => enabledCols.includes(c.header))
      .map((col, i) => (i === 0 ? { ...col, cell: utils.getCell } : col));
  }, [enabledCols]);

  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    getSubRows: (row) => row.childs,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    debugTable: true,
  });

  const onRowDoubleClick = (row: Row<types.Data>) => {
    const { original } = row;
    if (onRowDblClick) onRowDblClick(original);
  };

  const TableElem = (
    <Table stickyHeader size="small">
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const { id, colSpan, isPlaceholder, column, getContext } = header;
              const headerColDef = column.columnDef.header;
              const context = flexRender(headerColDef, getContext());
              return (
                <TableCell key={id} colSpan={colSpan}>
                  {isPlaceholder ? null : <div>{context}</div>}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} onDoubleClick={() => onRowDoubleClick(row)}>
            {row.getVisibleCells().map((cell) => {
              const { id, column, getContext, getValue } = cell;
              const cellColDef = column.columnDef.cell;
              const ctx = flexRender(cellColDef, getContext());
              const value = getValue() as string;
              const hasFilterStr = utils.hasString(value, filter);
              // console.log(row.id,  value, hasFilterStr);
              return (
                <TableCell key={id}>
                  <span style={styles.TextStyle(hasFilterStr)}>{ctx}</span>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const ErrorElem = (
    <Alert variant="outlined" severity="error" sx={{ m: "auto" }}>
      Failed to load table data
    </Alert>
  );

  const ContentElem =
    sourceData.length > 0 ? (
      <React.Fragment>
        <Paper elevation={2} sx={{ overflow: "auto" }}>
          {TableElem}
        </Paper>
      </React.Fragment>
    ) : (
      <Alert variant="outlined" severity="warning" sx={{ m: "auto" }}>
        No Data
      </Alert>
    );
  return hasError ? ErrorElem : ContentElem;
}
