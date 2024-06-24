export const asyncSleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
