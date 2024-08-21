import dicomParser, { DataSet, Element } from "dicom-parser";

import { DcmJsonModelObj, PNValue } from "./dcmTypes";
import { TAG_DICT } from "./dataDictionary";
import { valueDecode } from "./decoder";

export const parseDcm = async (buffer: Uint8Array) => {
  try {
    return dicomParser.parseDicom(buffer);
  } catch (err) {
    console.error(`Parse dcm failed`, err);
  }
};

export const getJson = (dataset: DataSet) => {
  const elems = Object.values(dataset.elements);
  return getElements(dataset, elems);
};

const getElements = (dataset: DataSet, elements: Array<Element>) => {
  const elems = Object.values(elements).reduce<DcmJsonModelObj>((p, c) => {
    const { tag } = c;
    // * skip sequence delimiters
    if (tag === "xfffee00d") return p;
    // * skip meta elements and sequence delimiters
    // if (tag.startsWith("x0002") || tag === "xfffee00d") return p;
    return { ...p, ...getElement(dataset, c) };
  }, {});
  return elems;
};

const getElement = (dataset: DataSet, element: Element): DcmJsonModelObj => {
  const { tag, items } = element;
  const standardTag = `${getTagGroup(tag)}${getTagElement(tag)}`.toUpperCase();
  const vr = getVR(element);
  const Value = items ? getSQValues(items) : getValue(dataset, element);
  const jsonObjVal = Value ? { vr, Value } : { vr };
  return { [standardTag]: jsonObjVal };
};

const getTagGroup = (tag: string) => tag.slice(1, 5);
const getTagElement = (tag: string) => tag.slice(5, 9);

const getTagWithParentheses = (tag: string) =>
  `(${getTagGroup(tag)},${getTagElement(tag)})`.toUpperCase();

export const getVR = (element: Element) => {
  const { tag, vr } = element;
  const tagWithParentheses = getTagWithParentheses(tag);
  const VR = vr || TAG_DICT[tagWithParentheses]?.vr || "UN";
  return VR.split("|")[0];
};

const getVM = (dataset: DataSet, element: Element) => {
  const { tag } = element;
  const tagWithParentheses = getTagWithParentheses(tag);
  const VM = TAG_DICT[tagWithParentheses]?.vm || dataset.numStringValues(tag);
  return isNaN(Number(VM)) ? 1 : Number(VM);
};

const getSQValues = (items: Array<Element>) => {
  if (!items.length) return;
  return items.map(getSQValue);
};

export const getSQValue = (item: Element) => {
  const { dataSet } = item;
  if (!dataSet) return {};
  return getElements(dataSet, Object.values(dataSet.elements));
};

export const getValue = (dataset: DataSet, element: Element) => {
  const { tag } = element;
  const vr = getVR(element);
  const vm = getVM(dataset, element);

  switch (vr) {
    case "AT":
      return [dataset.attributeTag(tag)];
    case "OB":
    case "OD":
    case "OF":
    case "OV":
    case "OW":
      return ["(Binary data)"];
    // case "UN":
    //   return ["(Unknown)"];

    case "US":
      return Array.from({ length: vm }).reduce<Array<number>>((p, _, i) => {
        const value = dataset.uint16(tag, i);
        if (value === undefined) return p;
        return [...p, value];
      }, []);
    case "SS":
      return Array.from({ length: vm }).reduce<Array<number>>((p, _, i) => {
        const value = dataset.int16(tag, i);
        if (value === undefined) return p;
        return [...p, value];
      }, []);
    case "UL":
      return Array.from({ length: vm }).reduce<Array<number>>((p, _, i) => {
        const value = dataset.uint32(tag, i);
        if (value === undefined) return p;
        return [...p, value];
      }, []);
    case "SL":
      return Array.from({ length: vm }).reduce<Array<number>>((p, _, i) => {
        const value = dataset.int32(tag, i);
        if (value === undefined) return p;
        return [...p, value];
      }, []);
    case "FL":
      return Array.from({ length: vm }).reduce<Array<number>>((p, _, i) => {
        const value = dataset.float(tag, i);
        if (value === undefined) return p;
        return [...p, value];
      }, []);
    case "FD":
      return Array.from({ length: vm }).reduce<Array<number>>((p, _, i) => {
        const value = dataset.double(tag, i);
        if (value === undefined) return p;
        return [...p, value];
      }, []);
    case "DS":
      return Array.from({ length: vm }).reduce<Array<number>>((p, _, i) => {
        const value = dataset.floatString(tag, i);
        if (value === undefined) return p;
        return [...p, value];
      }, []);
    case "IS":
      return Array.from({ length: vm }).reduce<Array<number>>((p, _, i) => {
        const value = dataset.intString(tag, i);
        if (value === undefined) return p;
        return [...p, value];
      }, []);

    case "SQ":
      // * do nothing, caller should handle recursive structure
      return;

    case "SH":
    case "LO":
    case "ST":
    case "LT":
    case "UC":
    case "UT":
      return valueDecode(dataset, element, vr);
    case "PN": {
      const values = valueDecode(dataset, element, vr);
      const Alphabetic = values?.[0];
      const Ideographic = values?.[1];
      const Phonetic = values?.[2];
      const Value = { Alphabetic, Ideographic, Phonetic };
      const result = Object.entries(Value).reduce<PNValue>((p, [k, v]) => {
        const value = v ? { [k]: v } : {};
        return { ...p, ...value };
      }, {});
      return [result];
    }
    default: {
      const value = dataset.string(tag);
      if (!value) return;
      if (value?.includes("\\")) return value.split("\\");
      return [value];
    }
  }
};
