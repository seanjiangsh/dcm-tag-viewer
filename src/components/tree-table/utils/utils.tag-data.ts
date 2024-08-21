import * as dcmTypes from "@utils/dcm/dcmTypes";
import { TAG_DICT } from "@utils/dcm/dataDictionary";

import * as types from "../types";

export const getDcmVals = (tag: string, val: dcmTypes.DcmJsonModelObjVal) => {
  // * get tag and name
  const { vr, Value, BulkDataURI, InlineBinary } = val;
  const group = tag.slice(0, 4);
  const groupNum = Number(group);
  const isPrivate = !isNaN(groupNum) && groupNum % 2 !== 0;
  const elem = tag.slice(4, 8);
  const tagStr = `(${group},${elem})`;
  const tagDictName = TAG_DICT[tagStr]?.name || "Unknown";
  const tagName = isPrivate ? "(Private Tag)" : tagDictName;

  // * get value
  const values: Array<string> = [];
  switch (vr) {
    case "OB":
    case "OD":
    case "OF":
    case "OV":
    case "OW": {
      if (Value) values.push("(Binary data)");
      break;
    }
    case "PN": {
      const a = Value?.[0]?.Alphabetic;
      const i = Value?.[0]?.Ideographic;
      const p = Value?.[0]?.Phonetic;
      if (a) values.push(a);
      if (i) values.push(i);
      if (p) values.push(p);
      break;
    }
    case "SQ": {
      // * do nothing, caller should handle recursive structure
      break;
    }
    default:
      if (Value) Value.forEach((v) => values.push(String(v)));
      else if (BulkDataURI) values.push("(Binary data)");
      else if (InlineBinary) values.push("(Binary data)");
      break;
  }

  const result: types.DcmTreeValue = { tagStr, tagName, values };
  return result;
};

export const getTagData = (
  json: dcmTypes.DcmJsonModelObj,
  parentPath?: string
): Array<types.Data> => {
  // * skip meta elements
  const sortedKeys = Object.keys(json)
    .filter((k) => !k.startsWith("0002"))
    .sort();
  return sortedKeys.map<types.Data>((tag) => {
    const val = json[tag];
    const dcmVals = getDcmVals(tag, val);
    const { tagStr, tagName } = dcmVals;
    const value = dcmVals.values.join(", ");

    const valKey = val.vr === "SQ" ? `${tag}.Value` : `${tag}.Value[0]`;
    const key = parentPath ? `${parentPath}.${valKey}` : valKey;

    const values = { tagStr, tagName, vr: val.vr, value };
    const data: types.Data = { key, values };

    if (val.vr === "SQ" && val.Value) {
      data.childs = Object.values(val.Value).reduce((p, c, i) => {
        const child = getTagData(c, `${key}[${i}]`);
        return [...p, ...child];
      }, []);
    }
    return data;
  }, []);
};
