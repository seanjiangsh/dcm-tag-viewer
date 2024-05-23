import { useEffect } from "react";
import { debounce } from "throttle-debounce";

import { useDispatch, useSelector } from "@redux/root-hook";
import { selectLayout, layoutActions } from "@redux/layout/reducer";
import { selectScreenSize } from "@redux/layout/selectors";

import { getScreenSize } from "@redux/layout/utils";

const { setScreenSize } = layoutActions;

// * RWD listener
export const useSetWindowSize = () => {
  const dispatch = useDispatch();
  const screenSize = useSelector(selectScreenSize);

  useEffect(() => {
    const handleResize = debounce(100, () =>
      dispatch(setScreenSize(getScreenSize()))
    );
    if (!screenSize.initialized) handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, screenSize.initialized]);
};
