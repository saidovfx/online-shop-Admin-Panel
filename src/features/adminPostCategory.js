import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axios.api";
import { showError, showSuccess } from "../config/toastConfig";

// Добавить категорию
export const addCategory = createAsyncThunk(
  "addCategory/category",
  async ({ name }, { rejectWithValue }) => {
    try {
      const response = await api.post("categories.json", { name });
      showSuccess("Категория успешно добавлена!"); // Ruscha success toast
      return response.data;
    } catch (error) {
      showError("Ошибка при добавлении категории!"); // Ruscha error toast
      return rejectWithValue(error.message);
    }
  }
);

// Получить категории
export const getCategory = createAsyncThunk(
  "getCategory/category",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/categories.json");
      return response.data;
    } catch (error) {
      showError("Ошибка при получении категорий!"); // Ruscha
      return rejectWithValue(error.message);
    }
  }
);

// Изменить категорию
export const put_category = createAsyncThunk(
  "put_category/category",
  async ({ id, name }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.put(`/categories/${id}.json`, { name });
      dispatch(getCategory());
      showSuccess("Категория успешно добавлена!"); // Ruscha success toast
      ("Категория успешно обновлена!");
      return response.data;
    } catch (error) {
      toast.error("Ошибка при обновлении категории!");
      return rejectWithValue(error.message);
    }
  }
);

// Удалить категорию
export const deletecategory = createAsyncThunk(
  "deleteCategory/category",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`/categories/${id}.json`);
      dispatch(getCategory());
      showSuccess("Категория успешно удалена!");
      return response.data;
    } catch (error) {
      showError("Ошибка при удалении категории!");
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  category_success: false,
  category_loading: false,
  category_error: false,
  category_reportError: "",

  get_loading: false,
  get_success: false,
  get_error: false,
  get_reportError: "",
  categories: [],

  put_loading: false,
  put_error: false,
  put_reportError: "",
  put_success: false,
  delete_loading: false,
  delete_success: false,
  delete_error: false,
  delete_reportError: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.category_error = false;
        state.category_loading = true;
        state.category_reportError = "";
        state.category_success = false;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.category_error = true;
        state.category_loading = false;
        state.category_reportError = action.payload;
        state.category_success = false;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.category_error = false;
        state.category_loading = false;
        state.category_reportError = "";
        state.category_success = true;
      })
      .addCase(getCategory.pending, (state) => {
        state.get_loading = true;
        state.get_error = false;
        state.get_reportError = "";
        state.get_success = false;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.get_loading = false;
        state.get_error = true;
        state.get_reportError = action.payload;
        state.get_success = false;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.get_loading = false;
        state.get_error = false;
        state.get_reportError = "";
        state.get_success = true;

        state.categories = action.payload
          ? Object.entries(action.payload).map(([id, value]) => ({
              id,
              ...value,
            }))
          : [];
      })
      .addCase(put_category.pending, (state) => {
        state.put_error = false;
        state.put_loading = true;
        state.put_reportError = "";
        state.put_success = false;
      })
      .addCase(put_category.rejected, (state, action) => {
        state.put_error = true;
        state.put_loading = false;
        state.put_reportError = action.payload;
        state.put_success = false;
      })
      .addCase(put_category.fulfilled, (state) => {
        state.put_error = false;
        state.put_loading = false;
        state.put_reportError = "";
        state.put_success = true;
      })
      .addCase(deletecategory.pending, (state) => {
        state.delete_loading = true;
        state.delete_error = false;
        state.delete_reportError = "";
        state.delete_success = false;
      })
      .addCase(deletecategory.rejected, (state, action) => {
        state.delete_loading = false;
        state.delete_error = true;
        state.delete_reportError = action.payload;
        state.delete_success = false;
      })
      .addCase(deletecategory.fulfilled, (state) => {
        state.delete_loading = false;
        state.delete_error = false;
        state.delete_reportError = "";
        state.delete_success = true;
      });
  },
});

export default categorySlice.reducer;
