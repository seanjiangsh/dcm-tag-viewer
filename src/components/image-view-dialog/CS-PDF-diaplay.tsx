import { useEffect, useState } from "react";
import { DataSet } from "dicom-parser";

import { File } from "@redux/layout/types";

const styles = {
  width: "95dvw",
  height: "85dvh",
  borderRadius: "10px",
};

type CSPDFProps = { file: File };

export default function CSPDFDisplay(props: CSPDFProps) {
  const { dataset } = props.file;
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fawPdf = getRawPdf(dataset);
    if (!fawPdf) return;

    const blob = new Blob([fawPdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

    // Clean up the object URL when the component unmounts or when the file changes
    return () => {
      URL.revokeObjectURL(url);
      setPdfUrl(null);
    };
  }, [dataset]);

  const iFrame = pdfUrl && (
    <iframe src={pdfUrl} style={{ width: "100%", height: "100%" }} />
  );

  return <div style={styles}>{iFrame}</div>;
}

const getRawPdf = (dataset: DataSet) => {
  const encDoc = dataset?.elements.x00420011;
  if (!encDoc) return;
  const { dataOffset, length } = encDoc;
  const start = dataOffset;
  const end = dataOffset + length;
  const rawPdf = dataset.byteArray.slice(start, end);
  return rawPdf;
};
