import {
  configureStore,
  ThunkAction,
  Action,
  Middleware,
  combineReducers,
} from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import { layoutReducer } from "@redux/layout/reducer";

const logger = createLogger({ duration: true, collapsed: true });
const middlewares: Array<Middleware> = import.meta.env.DEV ? [logger] : [];

const rootReducer = combineReducers({ layout: layoutReducer });

export const setupStore = (preloadedState = {}) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(middlewares),
    preloadedState,
  });

export const store = setupStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
