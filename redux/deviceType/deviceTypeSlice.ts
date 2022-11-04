import { createSlice } from "@reduxjs/toolkit";

export interface DeviceTypeSlice {
  value: {
    isMobile: boolean;
  };
}

const initialState: DeviceTypeSlice = {
  value: {
    isMobile: false,
  },
};

export const deviceTypeSlice = createSlice({
  name: "deviceType",
  initialState,
  reducers: {
    setMobile: (state) => {
      state.value.isMobile = true;
    },
    resetMobile: (state) => {
      state.value.isMobile = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMobile, resetMobile } = deviceTypeSlice.actions;

export default deviceTypeSlice.reducer;
