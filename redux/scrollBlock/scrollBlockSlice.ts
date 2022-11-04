import { createSlice } from "@reduxjs/toolkit";

export interface ScrollBlockSlice {
  value: {
    isBlocking: boolean;
  };
}

const initialState: ScrollBlockSlice = {
  value: {
    isBlocking: false,
  },
};

export const scrollBlockSlice = createSlice({
  name: "scrollBlock",
  initialState,
  reducers: {
    setBlocking: (state) => {
      state.value.isBlocking = true;
    },
    removeBlocking: (state) => {
      state.value.isBlocking = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeBlocking, setBlocking } = scrollBlockSlice.actions;

export default scrollBlockSlice.reducer;
