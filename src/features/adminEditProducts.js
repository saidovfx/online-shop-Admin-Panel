import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axios.api";
import { get_products } from "./adminUploa.js";
import { showError, showSuccess } from "../config/toastConfig";

export const editProducts = createAsyncThunk(
  "editProduct/products",
  async (
    { name, desc, price, endStatus, id, category, images },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await api.put(`/products/${id}.json`, {
        name,
        desc,
        price,
        category,
        endStatus,
        images,
      });

      dispatch(get_products());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct/product",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`/products/${id}.json`);
      dispatch(get_products());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  delete_loading: false,
  delete_success: false,
  delete_error: false,
  delete_reportError: "",

  edit_loading: false,
  edit_success: false,
  edit_error: false,
  edit_reportError: "",
};

const editProductSlice = createSlice({
  name: "editProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //-- EDIT PRODUCT --
      .addCase(editProducts.pending, (state) => {
        state.edit_loading = true;
        state.edit_error = false;
        state.edit_success = false;
        state.edit_reportError = "";
      })
      .addCase(editProducts.fulfilled, (state) => {
        state.edit_loading = false;
        state.edit_success = true;
        showSuccess("✔️ Продукт успешно обновлён!");
      })
      .addCase(editProducts.rejected, (state, action) => {
        state.edit_loading = false;
        state.edit_error = true;
        state.edit_success = false;
        state.edit_reportError = action.payload;
        showError(`❌ Ошибка при обновлении: ${action.payload}`);
      })

      //-- DELETE PRODUCT --
      .addCase(deleteProduct.pending, (state) => {
        state.delete_loading = true;
        state.delete_error = false;
        state.delete_success = false;
        state.delete_reportError = "";
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.delete_loading = false;
        state.delete_success = true;
        showSuccess("🗑️ Продукт успешно удалён!");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.delete_loading = false;
        state.delete_error = true;
        state.delete_success = false;
        state.delete_reportError = action.payload;
        showError(`❌ Ошибка при удалении: ${action.payload}`);
      });
  },
});

export default editProductSlice.reducer;
