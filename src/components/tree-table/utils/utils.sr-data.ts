import { JSONPath } from "jsonpath-plus";

import {
  DcmJsonModel,
  DcmJsonModelObj,
  SrValueTypeDefs,
} from "@utils/dcm/dcmTypes";
import * as types from "../types";

type SRParentData = {
  prevExpandId: string;
  nextExpandId: string;
  path: string;
  conditions: { [path: string]: string };
};

/**
 * * Always new this class to get necessary data
 * * note: make this util a class to prevent mutation of "srInitExpands"
 */
export default class SRDataUtil {
  private srInitExpands = new Set<string>();

  constructor(private json: DcmJsonModelObj) {}

  public isSR = () => {
    const modalityPath = "$['00080060'].Value[0]";
    const modality = JSONPath({ json: this.json, path: modalityPath })[0];
    return modality === "SR";
    // const modalityPath = "00080060.Value[0]";
    // const modality = JSONPath({ json, path: modalityPath })[0];
    // const cmPath = "0040A043.Value[0].00080104.Value[0]";
    // const codeMeaning = JSONPath({ json, path: cmPath })[0];
    // const vtPath = "0040A040.Value[0]";
    // const valueType = JSONPath({ json, path: vtPath })[0];
    // // console.log(modality, codeMeaning, valueType);
    // return modality === "SR" && codeMeaning && valueType;
  };

  public getSRInitExpands = (): Record<string, boolean> => {
    const ids = Array.from(this.srInitExpands);
    return ids.reduce((p, c) => ({ ...p, ...{ [c]: true } }), {});
  };

  public getSRData = (parent?: SRParentData): Array<types.Data> => {
    // * clear expand paths
    if (!parent) this.srInitExpands.clear();
    const parentPath = parent?.path || "$";
    const json = this.json;

    // * get "code meaning" (title)
    const cmKey = "['0040A043'].Value[0]['00080104'].Value[0]";
    const key = `${parentPath}${cmKey}`;
    const cmVal = JSONPath({ json, path: key })[0];
    if (!cmVal) return []; // * not an SR
    const title = cmVal;

    // * get "value type" to determinate value tag
    const vtPath = `${parentPath}['0040A040'].Value[0]`;
    const vtVal = JSONPath({ json, path: vtPath })[0];
    if (!vtVal) return [{ key, values: { title: cmVal, value: "", unit: "" } }];
    const { valuePath, unitPath } = this.getValueTypeId(vtVal);

    if (parent && vtVal !== "CODE") this.srInitExpands.add(parent.prevExpandId);

    // * value
    const vaPath = valuePath ? `${parentPath}${valuePath}` : "";
    const value = JSONPath({ json, path: vaPath })[0] || "";

    // * unit
    const unPath = unitPath ? `${parentPath}${unitPath}` : "";
    const unit = JSONPath({ json, path: unPath })[0] || "";

    // * get content(child) of this code meaning
    const ctPath = `${parentPath}['0040A730'].Value`;
    const ctParams = { json, path: ctPath };
    const ctNode = JSONPath(ctParams)[0] as DcmJsonModel | undefined;

    const valueKey = vaPath;
    const unitKey = unPath;
    const contentKey = ctPath;
    const conds = { [key]: title };
    const conditions = parent ? { ...parent.conditions, ...conds } : conds;
    const values: any = {
      title,
      value,
      unit,
      valueKey,
      unitKey,
      contentKey,
      conditions,
    };
    const getChilds = (ctNode: DcmJsonModel) =>
      Object.values(ctNode).reduce<Array<types.Data>>((p, c, i) => {
        const currentExpandId = parent?.nextExpandId;
        const prevExpandId = currentExpandId || "0";
        const nextExpandId = `${prevExpandId}.${i}`;
        const path = `${ctPath}[${i}]`;
        const parentIds = { prevExpandId, nextExpandId };
        const parentData: SRParentData = { ...parentIds, path, conditions };
        const childs = this.getSRData(parentData);
        return [...p, ...childs];
      }, []);
    const childs = ctNode && getChilds(ctNode);
    const data: types.Data = { key, values };
    if (childs) data.childs = childs;
    return [data];
  };

  private getValueTypeId = (valueType: SrValueTypeDefs | undefined) => {
    let valuePath = "";
    let unitPath = "";
    switch (valueType) {
      case "TEXT": {
        valuePath = "['0040A160'].Value[0]";
        break;
      }
      case "NUM": {
        valuePath = "['0040A300'].Value[0]['0040A30A'].Value[0]";
        unitPath =
          "['0040A300'].Value[0]['004008EA'].Value[0]['00080104'].Value[0]";
        break;
      }
      case "CODE": {
        valuePath = "['0040A168'].Value[0]['00080104'].Value[0]";
        break;
      }
      case "DATETIME": {
        valuePath = "['0040A120'].Value[0]";
        break;
      }
      case "DATE": {
        valuePath = "['0040A121'].Value[0]";
        break;
      }
      case "TIME": {
        valuePath = "['0040A122'].Value[0]";
        break;
      }
      case "UIDREF": {
        valuePath = "['0040A124'].Value[0]";
        break;
      }
      case "PNAME": {
        valuePath = "['0040A123'].Value[0]";
        break;
      }
      case "CONTAINER": {
        break;
      }
      default: {
        break;
      }
    }
    return { valuePath, unitPath };
  };
}
