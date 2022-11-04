import { createSlice } from "@reduxjs/toolkit";

export interface OrderRefetchSlice {
  value: {
    refetchCount: number;
  };
}

const initialState: OrderRefetchSlice = {
  value: {
    refetchCount: 0,
  },
};

export const orderRefetchSlice = createSlice({
  name: "orderRefetch",
  initialState,
  reducers: {
    refetchOrders: (state) => {
      state.value.refetchCount = state.value.refetchCount + 1;
    },
  },
});

// Action creators are generate for each case reducer function
export const { refetchOrders } = orderRefetchSlice.actions;

export default orderRefetchSlice.reducer;
