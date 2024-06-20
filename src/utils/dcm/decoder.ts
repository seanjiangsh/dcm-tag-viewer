import { DataSet, Element } from "dicom-parser";

const DECODE_LABEL: { [key: string]: string } = {
  "ISO_IR 101": "iso-8859-2",
  "ISO_IR 109": "iso-8859-3",
  "ISO_IR 110": "iso-8859-4",
  "ISO_IR 144": "iso-8859-5",
  "ISO_IR 127": "iso-8859-6",
  "ISO_IR 126": "iso-8859-7",
  "ISO_IR 138": "iso-8859-8",
  "ISO_IR 148": "iso-8859-9",
  "ISO_IR 166": "iso-8859-11",
  "ISO 2022 IR 87": "iso-2022-jp",
  "ISO_IR 13": "shift-jis",
  "ISO 2022 IR 13": "shift-jis",
  "ISO_IR 192": "utf-8",
  GB18030: "gb18030",
  GB2312: "gb2312",
  GBK: "chinese",
};

const getLangLabel = () => {
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

const splitPN = (buffer: Uint8Array) => {
  let tmp = [];
  let result = [];
  const { length } = buffer;
  for (let i = 0; i < length; i++) {
    if (buffer[i] === 0x3d) {
      result.push(tmp);
      tmp = [];
    } else if (i === length - 1) {
      tmp.push(buffer[i]);
      result.push(tmp);
    } else {
      tmp.push(buffer[i]);
    }
  }
  return result;
};

const cleanString = (str: string) => {
  // * trim spaces
  str = str.trim();

  // * get rid of tailing null or ending zero-width space
  const lastCharCode = str.charCodeAt(str.length - 1);
  if (lastCharCode === 0 || lastCharCode === 8203)
    str = str.substring(0, str.length - 1);

  return str;
};

export const valueDecode = (dataset: DataSet, dcmElem: Element, vr: string) => {
  const buffer = dataset.byteArray;
  const charset = dataset.string("x00080005") || "ISO_IR 192";
  const charsets = charset.split("\\");
  const valueBuffer = buffer.subarray(
    dcmElem.dataOffset,
    dcmElem.dataOffset + dcmElem.length
  );

  // * 0x3d or "=" symbol is the separator of VR=PN value, will needs to decode by charset sequence
  const valueBuffArray =
    vr === "PN" && valueBuffer.includes(0x3d)
      ? splitPN(valueBuffer)
      : [valueBuffer];

  // if (vr === "PN") {
  //   console.log(
  //     Array.from(valueBuffer)
  //       .map((b) => b.toString(16).padStart(2, "0"))
  //       .join(" ")
  //   );
  //   console.log({
  //     tag: dcmElem.tag,
  //     charsets,
  //     valueLength: valueBuffArray.length,
  //     valueBuffArray: valueBuffArray.map((v) =>
  //       Array.from(v)
  //         .map((b) => b.toString(16).padStart(2, "0"))
  //         .join(" ")
  //     ),
  //   });
  // }

  const values = valueBuffArray.reduce<Array<string>>((p, c, idx) => {
    let term = charsets[idx];
    if (charset === "ISO_IR 192" || !term) {
      term = "ISO_IR 192";
    }

    // if (idx === 0) term = "ISO_IR 192";
    // else if (idx === 1) term = "ISO 2022 IR 87";
    // else if (idx === 2) term = "ISO 2022 IR 87";

    const utfLabel = DECODE_LABEL[term];
    const textDecoder = utfLabel
      ? new TextDecoder(utfLabel)
      : new TextDecoder(getLangLabel());

    const decoded = textDecoder.decode(new Uint8Array(c));
    // if (vr === "PN") {
    //   console.log({
    //     idx,
    //     term,
    //     utfLabel,
    //     encoding: textDecoder.encoding,
    //     decoded,
    //   });
    // }
    const result = cleanString(decoded.trim());
    if (!result.length) return p;

    const multiValues = result.split("\\");
    if (multiValues.length > 1) return [...p, ...multiValues];

    return [...p, result];
  }, []);

  return values.length ? values : undefined;
};
