export type AsyncState = {
  status: "pending" | "rejected" | "fulfilled";
  rejectMsg?: string;
};

export type DeviceType = "mobile" | "tablet" | "desktop";
