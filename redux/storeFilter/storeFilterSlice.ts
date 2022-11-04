import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StoreFilterSlice {
  value: {
    isActive: boolean;
  };
}

const initialState: StoreFilterSlice = {
  value: {
    isActive: false,
  },
};

export const storeFilterSlice = createSlice({
  name: "storeFilter",
  initialState,
  reducers: {
    setActive: (state, { payload }: PayloadAction<{ isActive: boolean }>) => {
      state.value.isActive = payload.isActive;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActive } = storeFilterSlice.actions;

export default storeFilterSlice.reducer;
