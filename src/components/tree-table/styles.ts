import { Row } from "@tanstack/react-table";

export const ExpandIconStyle = { height: "20px", width: "20px" };
export const TDStyle = (hasFilterStr: boolean) => ({
  boxShadow: hasFilterStr ? "inset 0px 0px 3px #0288d1" : "unset",
  borderRadius: hasFilterStr ? 1 : 0,
});
export const CellStyle = (row: Row<any>) => {
  const { depth } = row;
  return {
    paddingLeft: `${depth * 1.5}rem`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  } as const;
};
export const CtrlHeaderStyle = {
  display: "flex",
  alignItems: "center",
} as const;
export const CtrlItemStyle = {
  m: 1,
  mr: 0,
  width: 150,
  maxWidth: "90%",
};
