import cs from "cornerstone-core";
import csMath from "cornerstone-math";
import csTools from "cornerstone-tools";
import csWADOImageLoader from "cornerstone-wado-image-loader";
import csWebImageLoader from "cornerstone-web-image-loader";
import dicomParser from "dicom-parser";
import Hammer from "hammerjs";

export const initCornerstone = () => {
  // * wado loader init
  const { href } = window.location;
  csWADOImageLoader.external.cornerstone = cs;
  csWADOImageLoader.external.dicomParser = dicomParser;
  csWADOImageLoader.configure({ strict: false });
  csWADOImageLoader.webWorkerManager.initialize({
    maxWebWorkers: navigator.hardwareConcurrency || 1,
    startWebWorkersOnDemand: true,
    webWorkerTaskPaths: [
      `${href}/js/610.min.worker.js`,
      `${href}/js/888.min.worker.js`,
    ],
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: false,
        usePDFJS: false,
        strict: false,
      },
    },
  });
  csTools.external.cornerstoneMath = csMath;
  csTools.external.cornerstone = cs;
  csTools.external.Hammer = Hammer;
  csTools.init({ showSVGCursors: true });
  csTools.toolStyle.setToolWidth(2);
  csTools.toolColors.setToolColor("rgb(255, 255, 0)");
  csTools.toolColors.setActiveColor("rgb(0, 255, 0)");

  // * web loader init
  csWebImageLoader.external.cornerstone = cs;
  // console.log(cs, csWADOImageLoader, csMath, csTools);
};

export const enableOverlayTools = (csDiv: HTMLDivElement) => {
  const tools = ["Overlay", "ScaleOverlay"];
  tools.forEach((toolName) => enableTool(csDiv, toolName));
};

export const enableTool = (csDiv: HTMLDivElement, toolName: string) => {
  const tool = csTools[`${toolName}Tool`];
  csTools.addToolForElement(csDiv, tool);
  csTools.setToolEnabled(toolName);
};

export const initAndDisplayImage = async (
  imageId: string,
  csDiv: HTMLDivElement
) => {
  initCornerstone();

  // * load image
  const image = await cs.loadAndCacheImage(imageId);

  // * display image
  cs.enable(csDiv);
  cs.displayImage(csDiv, image);

  // * enable overlay tools
  enableOverlayTools(csDiv);
};
