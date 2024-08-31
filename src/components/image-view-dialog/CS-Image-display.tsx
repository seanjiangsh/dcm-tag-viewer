import { useEffect, useRef } from "react";

import { initAndDisplayImage } from "@utils/cornerstone";

type CSImageDisplayProps = { imageId: string };

const styles = {
  width: "80dvw",
  height: "70dvh",
  borderRadius: "10px",
};
export default function CSImageDisplay(props: CSImageDisplayProps) {
  const { imageId } = props;
  const csDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const csDiv = csDivRef.current;
    if (!csDiv) return;
    initAndDisplayImage(imageId, csDiv);
  }, [imageId, csDivRef]);

  return <div ref={csDivRef} style={styles} />;
}
