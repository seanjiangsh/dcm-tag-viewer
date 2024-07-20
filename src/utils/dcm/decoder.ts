import { DataSet, Element } from "dicom-parser";

const DECODE_LABEL: { [key: string]: string } = {
  "ISO_IR 6": "iso-8859-1", // Latin alphabet No. 1 (Western European languages)
  "ISO_IR 100": "iso-8859-1", // Latin alphabet No. 1 (Western European languages)
  "ISO_IR 101": "iso-8859-2", // Latin alphabet No. 2 (Eastern European languages)
  "ISO_IR 109": "iso-8859-3", // Latin alphabet No. 3 (South European languages)
  "ISO_IR 110": "iso-8859-4", // Latin alphabet No. 4 (North European languages)
  "ISO_IR 126": "iso-8859-7", // Greek
  "ISO_IR 127": "iso-8859-6", // Arabic
  "ISO_IR 138": "iso-8859-8", // Hebrew
  "ISO_IR 144": "iso-8859-5", // Cyrillic alphabet (Eastern European languages, including Russian)
  "ISO_IR 148": "iso-8859-9", // Turkish
  "ISO_IR 166": "iso-8859-11", // Thai
  "ISO_IR 192": "utf-8",
  "ISO 2022 IR 6": "iso-8859-1",
  "ISO 2022 IR 100": "iso-8859-1",
  "ISO 2022 IR 101": "iso-8859-2",
  "ISO 2022 IR 109": "iso-8859-3",
  "ISO 2022 IR 110": "iso-8859-4",
  "ISO 2022 IR 126": "iso-8859-7",
  "ISO 2022 IR 127": "iso-8859-6",
  "ISO 2022 IR 138": "iso-8859-8",
  "ISO 2022 IR 144": "iso-8859-5",
  "ISO 2022 IR 148": "iso-8859-9",
  "ISO 2022 IR 166": "iso-8859-11",
  // Japanese
  "ISO_IR 13": "shift-jis",
  "ISO 2022 IR 13": "shift-jis",
  "ISO 2022 IR 87": "iso-2022-jp",
  "ISO 2022 IR 159": "iso-2022-jp",
  // Korean
  "ISO 2022 IR 149": "euc-kr",
  // Simplified Chinese
  "ISO 2022 58": "gb2312",
  "ISO 2022 IR 58": "gb2312",
  "ISO 2022 GBK": "gbk",
  GB18030: "gb18030",
  GBK: "gbk",
};

export const getLangLabel = () => {
  const locale = navigator.language;
  switch (locale) {
    case "zh-TW":
      return "big5";
    case "zh-CN":
      return "gbk";
    case "ja":
      return "shift-jis";
    default:
      return "utf-8";
  }
};

export const splitPN = (buffer: Uint8Array): Array<Uint8Array> => {
  let tmp: Array<number> = [];
  let result: Array<Uint8Array> = [];
  const { length } = buffer;
  for (let i = 0; i < length; i++) {
    if (buffer[i] === 0x3d) {
      result.push(new Uint8Array(tmp));
      tmp = [];
    } else if (i === length - 1) {
      tmp.push(buffer[i]);
      result.push(new Uint8Array(tmp));
    } else {
      tmp.push(buffer[i]);
    }
  }
  return result;
};

export const cleanString = (str: string) => {
  // * trim spaces
  str = str.trim();

  // * get rid of tailing null or ending zero-width space
  const lastCharCode = str.charCodeAt(str.length - 1);
  if (lastCharCode === 0 || lastCharCode === 8203) {
    str = str.substring(0, str.length - 1);
  }

  return str;
};

export const toHexString = (buffer: Uint8Array) =>
  Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(" ");

export const clearStringEscape = (str: string) => {
  const buffer = new TextEncoder().encode(str);
  // console.log("clearStringEscape", toHexString(buffer));
  const { length } = buffer;
  let tmp: Array<number> = [];
  for (let i = 0; i < length; i++) {
    if (buffer[i] === 0x1b) {
      i += 2;
    } else {
      tmp.push(buffer[i]);
    }
  }
  return new TextDecoder("utf-8").decode(new Uint8Array(tmp));
};

const isGarbled = (str: string) => str.includes("�");

const checkGarbledAndTryDecode = (
  decoded: string,
  buffer: Uint8Array,
  charsets: Array<string>
) => {
  if (!isGarbled(decoded)) return decoded;
  for (const charset of charsets) {
    const utfLabel = DECODE_LABEL[charset] || getLangLabel();
    const textDecoder = new TextDecoder(utfLabel);
    const decoded = textDecoder.decode(buffer);
    if (!isGarbled(decoded)) return decoded;
  }
  return decoded;
};

export const valueDecode = (dataset: DataSet, dcmElem: Element, vr: string) => {
  const buffer = dataset.byteArray;
  const charset = dataset.string("x00080005") || "ISO_IR 192";
  const charsets = charset.split("\\").map((c) => c || "ISO_IR 192");
  const valueBuffer = buffer.subarray(
    dcmElem.dataOffset,
    dcmElem.dataOffset + dcmElem.length
  );

  // * 0x3d or "=" symbol is the separator of VR=PN value, will needs to decode by charset sequence
  const valueBuffArray: Array<Uint8Array> =
    vr === "PN" && valueBuffer.includes(0x3d)
      ? splitPN(valueBuffer)
      : [valueBuffer];

  // if (vr === "PN") {
  //   console.log(toHexString(valueBuffer));
  //   console.log({
  //     tag: dcmElem.tag,
  //     charsets,
  //     valueBuffArray: valueBuffArray.map(toHexString),
  //   });
  // }

  const values = valueBuffArray.reduce<Array<string>>((p, c, idx) => {
    const term = charsets[idx] || charsets.at(-1) || "ISO_IR 192";

    // let term = charsets[idx] || "ISO_IR 192";
    // if (idx === 0) term = "ISO_IR 192";
    // else if (idx === 1) term = "ISO 2022 IR 87";
    // else if (idx === 2) term = "ISO 2022 IR 13";

    const utfLabel = DECODE_LABEL[term] || getLangLabel();

    const textDecoder = new TextDecoder(utfLabel);
    const decoded = textDecoder.decode(new Uint8Array(c));
    const checked = checkGarbledAndTryDecode(decoded, c, charsets);
    const cleared = clearStringEscape(checked);

    const result = cleanString(cleared.trim());
    if (!result.length) return p;

    const multiValues = result.split("\\");
    if (multiValues.length > 1) return [...p, ...multiValues];

    return [...p, result];
  }, []);

  return values.length ? values : undefined;
};
