import { store } from "../redux/store";

export enum StoreProductImageAlignment {
  top = "top",
  bottom = "bottom",
  center = "center",
}

export interface StoreProduct {
  productName: string;
  price: number;
  typesID: string[];
  images: string[];
  _id: string;
  imageAlignment: StoreProductImageAlignment;
}

export interface CartItem {
  product: StoreProduct;
  quantity: number;
  size: string;
}

export interface ProductType {
  _id: string;
  typeName: string;
}

export interface StoreFilters {
  price: number;
  type: ProductType[];
}

export interface LocalStateType {
  localProducts: StoreProduct[];
  localTypes: ProductType[];
}

export enum LocalStorageChangesTypes {
  "localTypes" = "LOCAL_TYPES",
  "localProducts" = "LOCAL_PRODUCTS",
}

export interface AdminOrder {
  _id: string;
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  phoneNum: string;
  state: string;
  homeAddress: string;
  stringifiedOrder: string;
  createdAt: string;
  cartTotal: number;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
