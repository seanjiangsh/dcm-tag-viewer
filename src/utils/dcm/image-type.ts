import { JSONPath } from "jsonpath-plus";

import { DcmJsonModelObj } from "./dcmTypes";

export const getImageType = (json: DcmJsonModelObj) => {
  const modalityPath = "$['00080060'].Value[0]";
  const modality = JSONPath({ json, path: modalityPath })[0];
};
