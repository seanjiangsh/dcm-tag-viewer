import { useEffect, useRef } from "react";

import { File } from "@redux/layout/types";
import { initAndDisplayImage } from "@utils/cornerstone";

const styles = {
  width: "80dvw",
  height: "70dvh",
  borderRadius: "10px",
};

type CSImageDisplayProps = { file: File };

export default function CSImageDisplay(props: CSImageDisplayProps) {
  const { imageId } = props.file;
  const csDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const csDiv = csDivRef.current;
    if (!csDiv) return;
    initAndDisplayImage(imageId, csDiv);
  }, [imageId, csDivRef]);

  return <div ref={csDivRef} style={styles} />;
}
