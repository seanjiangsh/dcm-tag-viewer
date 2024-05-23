import { CellContext } from "@tanstack/react-table";
import { IconButton } from "@mui/material";
import { ExpandMore, ChevronRight } from "@mui/icons-material";

import * as types from "../types";
import * as styles from "../styles";

export const getExpandIcon = (isExpanded: boolean, onClick?: () => void) => (
  <IconButton sx={styles.ExpandIconStyle} onClick={onClick}>
    {isExpanded ? <ExpandMore /> : <ChevronRight />}
  </IconButton>
);

export const getCell = (cell: CellContext<any, any>) => {
  const { row, getValue } = cell;
  const { getCanExpand, getToggleExpandedHandler, getIsExpanded } = row;
  return (
    <div style={styles.CellStyle(row)}>
      {getValue() as string}
      {getCanExpand() &&
        getExpandIcon(getIsExpanded(), getToggleExpandedHandler())}
    </div>
  );
};

const getStringValues = ({ values }: types.Data): Array<string> =>
  Object.values(values).map((v) => v);

const getValueStrings = (
  tableData: types.Data,
  recursive?: boolean
): Array<string> => {
  const strVals = getStringValues(tableData);
  const { childs } = tableData;
  if (!recursive || !childs) return strVals;
  return childs.reduce(
    (p, c) => [...p, ...getValueStrings(c, recursive)],
    strVals
  );
};

export const hasString = (value: string, filter: string) => {
  if (!value || !filter) return false;
  return value.toLowerCase().includes(filter.trim().toLowerCase());
};

const hasMatch = (
  tableData: types.Data,
  filter: string,
  recursive?: boolean
): boolean => {
  if (!filter) return true;
  const allVals = getValueStrings(tableData, recursive);
  const foundVal = allVals.find((val) => hasString(val, filter));
  return !!foundVal;
};

export const getTableData = async (
  tableData: Array<types.Data>,
  filter: string
): Promise<Array<types.Data>> => {
  return tableData.reduce<Array<types.Data>>((p, c) => {
    const matched = hasMatch(c, filter, true);
    return matched ? [...p, c] : p;
  }, []);
};

const getExpandIds = (
  tableData: Array<types.Data>,
  filter: string,
  parentId?: string
): Array<string> => {
  if (!filter) return [];
  const ids = tableData.reduce<Array<string>>((p, c, i) => {
    const { childs } = c;
    const id = parentId ? `${parentId}.${i}` : String(i);
    const matched = hasMatch(c, filter);
    const childsIds = childs ? getExpandIds(childs, filter, id) : [];
    const ids = matched ? [id, ...childsIds] : childsIds;
    return [...p, ...ids];
  }, []);
  return ids;
};

export const getFilterExpand = async (
  tableData: Array<types.Data>,
  filter: string
): Promise<Record<string, boolean>> => {
  if (!filter) return {};
  const ids = getExpandIds(tableData, filter);
  const expandIds = ids
    .filter((id) => id.length > 1)
    .reduce<Array<string>>((p, c) => {
      const ids = c.split(".").reduce<Array<string>>((p, c, i) => {
        const prev = p[i - 1];
        const id = prev ? `${prev}.${c}` : c;
        return [...p, id];
      }, []);
      return [...p, ...ids];
    }, []);
  const sortedIds = Array.from(new Set(expandIds)).sort();
  return sortedIds.reduce((p, c) => ({ ...p, ...{ [c]: true } }), {});
};
