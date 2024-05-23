import React, { useState, useEffect, useMemo } from "react";
import { debounce } from "throttle-debounce";
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
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import utils from "./utils";
import * as types from "./types";
import * as styles from "./styles";

export default function TreeTable(props: types.TreeTableProps) {
  const { sourceData, columnDef, showCtrl, defaultExpand, onRowDblClick } =
    props;

  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState<Array<types.Data>>([]);
  const [filter, setFilter] = useState("");
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [enabledCols, setEnabledCols] = useState(
    columnDef.reduce<Array<string>>(
      (p, c) => (c.defaultDisabled ? p : [...p, c.header]),
      []
    )
  );

  const getExpand = async (data: Array<types.Data>) =>
    defaultExpand && !filter
      ? defaultExpand
      : await utils.getFilterExpand(data, filter);

  useEffect(() => {
    if (hasError || sourceData.length < 1) return;
    // console.time("Sorting table data");
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
    // console.timeEnd("Sorting table data");
  }, [filter, hasError]);

  useEffect(() => {
    return () => {
      setHasError(false);
      setData([]);
      setFilter("");
      setExpanded({});
      setEnabledCols([]);
    };
  }, []);

  const searchChange = debounce(500, (e) => setFilter(e.target.value));
  const selectChange = (e: SelectChangeEvent<Array<string>>) => {
    const { value } = e.target;
    const newCols = typeof value === "string" ? value.split(",") : value;
    setEnabledCols(newCols);
  };

  const expandLabel = expanded === true ? "Collapse All" : "Expand All";
  const expandAllIcon =
    expanded === true ? utils.getExpandIcon(true) : utils.getExpandIcon(false);
  const expandAllChange = async () => {
    if (expanded === true) {
      const expand = await getExpand(data);
      setExpanded(expand);
    } else {
      setExpanded(true);
    }
  };

  const CtrlElem = (
    <div style={styles.CtrlHeaderStyle}>
      <TextField
        size="small"
        variant="outlined"
        label="Search"
        sx={styles.CtrlItemStyle}
        onChange={searchChange}
      />
      <FormControl size="small" sx={styles.CtrlItemStyle}>
        <InputLabel>Columns</InputLabel>
        <Select
          multiple
          value={enabledCols}
          onChange={selectChange}
          input={<OutlinedInput label="Columns" />}
        >
          {columnDef.map(({ header }, i) => (
            <MenuItem key={`${header}-${i}`} value={header} sx={{ m: 1 }}>
              {header}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Chip
        variant="outlined"
        icon={expandAllIcon}
        label={expandLabel}
        onClick={expandAllChange}
        sx={styles.CtrlItemStyle}
      />
    </div>
  );

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
                <TableCell key={id} sx={styles.TDStyle(hasFilterStr)}>
                  {ctx}
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
        {showCtrl ? CtrlElem : null}
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
