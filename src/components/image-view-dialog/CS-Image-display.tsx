import { useEffect, useRef } from "react";
import cs from "cornerstone-core";

import { enableOverlayTools, initCornerstone } from "@utils/cornerstone";

type CSImageDisplayProps = { imageId?: string };

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
    if (!imageId || !csDiv) return;
    initAndDisplayImage(imageId, csDiv);
  }, [imageId, csDivRef]);

  return <div ref={csDivRef} style={styles} />;
}

const initAndDisplayImage = async (imageId: string, csDiv: HTMLDivElement) => {
  initCornerstone();

  // * load image
  const image = await cs.loadAndCacheImage(imageId);

  // * display image
  cs.enable(csDiv);
  cs.displayImage(csDiv, image);

  // * enable overlay tools
  enableOverlayTools(csDiv);
};
