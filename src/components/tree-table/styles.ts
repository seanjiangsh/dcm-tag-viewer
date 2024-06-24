import { Row } from "@tanstack/react-table";

export const ExpandIconStyle = { height: "20px", width: "20px" };
export const TextStyle = (hasFilterStr: boolean) => ({
  backgroundColor: hasFilterStr ? "#f9ffa1" : "unset",
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
