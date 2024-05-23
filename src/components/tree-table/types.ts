import { ExpandedState } from "@tanstack/react-table";

export type DcmTreeValue = {
  tagStr: string;
  tagName: string;
  values: Array<string>;
};

export type ColumnDef = Array<{
  header: string;
  accessorKey: string;
  defaultDisabled?: boolean;
}>;

export type Data = {
  key: string;
  values: { [key: string]: string };
  childs?: Array<Data>;
};
export type TreeTableProps = {
  sourceData: Array<Data>;
  columnDef: ColumnDef;
  showCtrl?: boolean;
  defaultExpand?: ExpandedState;
  onRowDblClick?: (data: Data) => void;
};
