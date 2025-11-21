import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/adminUploa.js";
import categorySlice from "../features/adminPostCategory.js";
import editSlice from "../features/adminEditProducts.js";
export const store = configureStore({
  reducer: {
    uploadProducts: productsSlice,
    category: categorySlice,
    edit: editSlice,
  },
});
