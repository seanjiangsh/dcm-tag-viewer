export type DcmJsonModelObj = { [key: string]: DcmJsonModelObjVal };
export type DcmJsonModelObjVal = {
  vr: string;
  Value?: Array<any>;
  BulkDataURI?: string;
  InlineBinary?: string;
};
export type DcmJsonModel = Array<DcmJsonModelObj>;
export type PNValue = {
  Alphabetic?: string;
  Ideographic?: string;
  Phonetic?: string;
};

// * 0040A040 value type
// TEXT
//    value -> 0040A160
// NUM
//    value -> 0040A300[0].0040A30A
//    unit -> 0040A300[0].004008EA[0].00080104
// CODE
//    value -> 0040A168[0].00080104
// DATETIME
//    value -> 0040A120
// DATE
//    value -> 0040A121
// TIME
//    value -> 0040A122
// PNAME
//    value -> 0040A123
// UIDREF
//    value -> 0040A124

// * (0040,A0404) Value Types
export type SrValueTypeDefs =
  | "TEXT"
  | "NUM"
  | "CODE"
  | "DATETIME"
  | "DATE"
  | "TIME"
  | "UIDREF"
  | "PNAME"
  | "COMPOSITE"
  | "IMAGE"
  | "WAVEFORM"
  | "SCOORD"
  | "SCOORD3D"
  | "TCOORD"
  | "CONTAINER";
