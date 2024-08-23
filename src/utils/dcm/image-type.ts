import { JSONPath } from "jsonpath-plus";

import { DcmJsonModelObj } from "./dcmTypes";

export type ImageTypes = "default" | "SR" | "PDF";

const PDF_SOPClass = "1.2.840.10008.5.1.4.1.1.104.1";

export const getImageType = (json: DcmJsonModelObj): ImageTypes => {
  // * check DICOM PDF
  const sopClassPath = "$['00080016'].Value[0]";
  const sopClass = JSONPath({ json, path: sopClassPath })[0];
  if (sopClass === PDF_SOPClass) return "PDF";

  // * check DICOM SR
  const modalityPath = "$['00080060'].Value[0]";
  const modality = JSONPath({ json, path: modalityPath })[0];
  if (modality === "SR") return "SR";

  return "default";
};
