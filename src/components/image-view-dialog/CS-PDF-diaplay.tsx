import React, { useEffect, useMemo, useState } from "react";
import csWADOImageLoader from "cornerstone-wado-image-loader";

type PDFViewerProps = {
  imageId: string;
};

export default function CSPDFDisplay(props: PDFViewerProps) {
  const { imageId } = props;
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fawPdf = getRawPdf(imageId);
    console.log({ imageId, fawPdf });
    if (!fawPdf) return;

    const blob = new Blob([fawPdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

    // Clean up the object URL when the component unmounts or when the file changes
    return () => {
      URL.revokeObjectURL(url);
      setPdfUrl(null);
    };
  }, [imageId]);

  return (
    <div>{pdfUrl && <iframe src={pdfUrl} width="100%" height="600px" />}</div>
  );
}

const getRawPdf = (imageId: string) => {
  const dsManager = csWADOImageLoader.wadouri.dataSetCacheManager;
  const dataset = dsManager.get(imageId);
  // const cachedImages = dsManager.cachedImages;
  const loaded = dsManager.isLoaded(imageId);
  console.log({ imageId, dsManager, dataset, loaded });
  const encDoc = dataset?.elements.x00420011;
  if (!encDoc) return;
  const { dataOffset, length } = encDoc;
  const start = dataOffset;
  const end = dataOffset + length;
  const rawPdf = dataset.byteArray.slice(start, end);
  return rawPdf;
};
