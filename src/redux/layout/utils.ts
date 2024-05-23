import * as LayoutTypes from "@redux/layout/types";

import theme from "@utils/theme";

const responsiveUtil = (width: number, height: number) => {
  let deviceType: LayoutTypes.Responsive["deviceType"] = "mobile";
  const windowRatio = width / height;
  const direction: LayoutTypes.Responsive["direction"] =
    windowRatio >= 1 ? "landscape" : "portrait";
  const longEdgeLength = width >= height ? width : height;
  const { md, lg } = theme.breakpoints.values;

  // * small device layout
  if (
    longEdgeLength < md ||
    (longEdgeLength < lg && (windowRatio >= 2 || windowRatio <= 0.5))
  )
    deviceType = "mobile";
  // * medium device layout
  else if (longEdgeLength >= md && longEdgeLength < lg) deviceType = "tablet";
  // * large device layout
  else if (longEdgeLength >= lg) deviceType = "desktop";

  return { deviceType, direction };
};

export const getScreenSize = (): LayoutTypes.ScreenSize => {
  const size = {
    width: Math.floor(window.innerWidth),
    height: Math.floor(window.innerHeight),
  };
  const { deviceType, direction } = responsiveUtil(size.width, size.height);
  return {
    windowSize: size,
    responsive: { deviceType, direction },
  };
};
