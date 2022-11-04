import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@rootDir/types";

export interface CartSlice {
  value: {
    products: CartItem[];
    showAddedPreview: boolean;
    recentAddedProductIdx: number | null;
    isCartMenuOpen: boolean;
    cartTotal: number;
  };
}

const initialState: CartSlice = {
  value: {
    products: [],
    showAddedPreview: false,
    recentAddedProductIdx: null,
    isCartMenuOpen: false,
    cartTotal: 0,
  },
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartMenuState: (
      { value },
      { payload }: PayloadAction<{ val: boolean }>
    ) => {
      value.isCartMenuOpen = payload.val;
    },
    closeAddedPreview: ({ value }) => {
      value.showAddedPreview = false;
    },
    addProduct: ({ value }, { payload }: PayloadAction<CartItem>) => {
      const existingItemIdx = value.products.findIndex(
        (existingProduct) =>
          existingProduct.product._id === payload.product._id &&
          existingProduct.size === payload.size
      );
      const alreadyExists = existingItemIdx !== -1;

      if (alreadyExists) {
        const existingProduct = value.products[existingItemIdx];
        const finalQuantity = existingProduct.quantity + payload.quantity;

        existingProduct.quantity = finalQuantity;
        value.showAddedPreview = true;
        value.recentAddedProductIdx = existingItemIdx;
        return;
      }

      const currentItemIdx = value.products.length;
      value.showAddedPreview = true;
      value.recentAddedProductIdx = currentItemIdx;
      value.products.push({ ...payload });
    },
    removeProduct: (
      { value },
      { payload }: PayloadAction<Omit<CartItem, "quantity">>
    ) => {
      const existingItemIdx = value.products.findIndex(
        (existingProduct) =>
          existingProduct.product._id === payload.product._id &&
          existingProduct.size === payload.size
      );
      const doesExist = existingItemIdx !== -1;
      if (!doesExist) return;

      value.products = value.products.filter(
        (item, currItemIdx) => currItemIdx !== existingItemIdx
      );
    },
    modifyProductQuantity: (
      { value },
      {
        payload,
      }: PayloadAction<{
        itemIdx: number | null;
        type: "addition" | "subtraction";
      }>
    ) => {
      const { itemIdx, type } = payload;
      if (itemIdx === null) return;

      const existingProduct = value.products[itemIdx];
      const existingQuantity = existingProduct.quantity;

      switch (type) {
        case "addition":
          existingProduct.quantity = existingQuantity + 1;
          break;
        case "subtraction":
          if (existingQuantity <= 1) {
            value.products = value.products.filter(
              (item, currItemIdx) => currItemIdx !== itemIdx
            );
          } else {
            existingProduct.quantity = existingQuantity - 1;
          }
          break;
        default:
          return;
      }
    },
    resetCartState: (state) => {
      state.value.products = [];
      state.value.isCartMenuOpen = false;
      state.value.recentAddedProductIdx = null;
      state.value.showAddedPreview = false;
    },
    setCartTotal: (state, { payload }: PayloadAction<{ val: number }>) => {
      state.value.cartTotal = payload.val;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addProduct,
  closeAddedPreview,
  modifyProductQuantity,
  setCartMenuState,
  removeProduct,
  resetCartState,
  setCartTotal,
} = cart.actions;

export default cart.reducer;
