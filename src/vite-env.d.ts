/// <reference types="vite/client" />

import { store } from "./src/redux/root-store";

declare global {
  interface Window {
    store: typeof store;
  }
}
