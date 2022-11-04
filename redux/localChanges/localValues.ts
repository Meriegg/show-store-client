import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ProductType, StoreProduct } from "@rootDir/types";
import { LocalStorageChangesTypes } from "@rootDir/types";

export interface LocalValuesSlice {
  value: {
    localTypes: ProductType[];
    localProducts: StoreProduct[];
  };
}

const initialState: LocalValuesSlice = {
  value: {
    localTypes: [],
    localProducts: [],
  },
};

export const localValuesSlice = createSlice({
  name: "localValues",
  initialState,
  reducers: {
    setValue: (
      state,
      { payload }: PayloadAction<{ val: LocalValuesSlice }>
    ) => {
      state.value = payload.val.value;
    },
    setLocalProducts: (
      state,
      { payload }: PayloadAction<{ val: StoreProduct[] }>
    ) => {
      state.value.localProducts = payload.val;
    },
    setLocalTypes: (
      state,
      { payload }: PayloadAction<{ val: ProductType[] }>
    ) => {
      state.value.localTypes = payload.val;
    },
    refetch: (state) => {
      const { value } = state;

      value.localTypes = JSON.parse(
        localStorage.getItem(LocalStorageChangesTypes.localTypes) || "[]"
      );

      value.localProducts = JSON.parse(
        localStorage.getItem(LocalStorageChangesTypes.localProducts) || "[]"
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocalProducts, setLocalTypes, setValue, refetch } =
  localValuesSlice.actions;

export default localValuesSlice.reducer;
