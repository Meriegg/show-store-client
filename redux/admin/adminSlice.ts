import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface AdminSlice {
  value: {
    isShowingAdminMenu: boolean;
  };
}

const initialState: AdminSlice = {
  value: {
    isShowingAdminMenu: false,
  },
};

export const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    setAdminMenuState: (
      state,
      { payload }: PayloadAction<{ val: boolean }>
    ) => {
      state.value.isShowingAdminMenu = payload.val;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAdminMenuState } = adminSlice.actions;

export default adminSlice.reducer;
