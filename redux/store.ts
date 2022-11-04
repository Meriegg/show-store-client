import deviceTypeSlice from "./deviceType/deviceTypeSlice";
import storeFilterSlice from "./storeFilter/storeFilterSlice";
import cartSlice from "./cart/cartSlice";
import scrollBlockSlice from "./scrollBlock/scrollBlockSlice";
import storeTypesSlice from "./storeTypes/storeTypesSlice";
import adminSlice from "./admin/adminSlice";
import localValuesSlice from "./localChanges/localValues";
import orderRefetchSlice from "./orderRefetch/orderRefetchSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    cartSlice: cartSlice,
    deviceType: deviceTypeSlice,
    storeFilter: storeFilterSlice,
    scrollBlock: scrollBlockSlice,
    storeTypes: storeTypesSlice,
    admin: adminSlice,
    localValues: localValuesSlice,
    orderRefetchSlice: orderRefetchSlice,
  },
});
