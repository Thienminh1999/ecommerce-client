import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./popup-detail";
import authReducer from "./auth";
import cartReducer from "./cart";
import counterReducer from "./counter";
import filterSearchReducer from "./search-product-filter";

export const store = configureStore({
  reducer: {
    popup: popupReducer,
    auth: authReducer,
    cart: cartReducer,
    counter: counterReducer,
    filterSearch: filterSearchReducer,
  },
});
