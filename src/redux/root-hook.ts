import {
  TypedUseSelectorHook,
  useDispatch as reduxDispatch,
  useSelector as reduxSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "./root-store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => reduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = reduxSelector;
