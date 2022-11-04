import { ProductType } from "@rootDir/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductTypesSlice {
  value: {
    types: ProductType[];
  };
}

const initialState: ProductTypesSlice = {
  value: {
    types: [],
  },
};

export const productTypesSlice = createSlice({
  name: "productTypes",
  initialState,
  reducers: {
    setTypes: (
      { value },
      { payload }: PayloadAction<{ types: ProductType[] }>
    ) => {
      value.types = payload.types;
    },
    deleteType: ({ value }, { payload }: PayloadAction<{ typeId: string }>) => {
      value.types = value.types.filter((type) => type._id !== payload.typeId);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTypes, deleteType } = productTypesSlice.actions;

export default productTypesSlice.reducer;
