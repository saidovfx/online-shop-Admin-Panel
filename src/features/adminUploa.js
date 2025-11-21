import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axios.api";
import { showError, showSuccess } from "../config/toastConfig";

// ============================ UPLOAD ============================
export const upload_products = createAsyncThunk(
  "products/upload",
  async (
    { images, name, price, shtok, desc, category },
    { rejectWithValue, getState }
  ) => {
    try {
      const uploadedImages = [];

      const { categories } = getState().category;

      // Validate Category Exists
      if (!categories.map((c) => c.name).includes(category)) {
        showError("Category does not exist!");
        return rejectWithValue("Category not found in list");
      }

      // Upload images to Cloudinary
      for (const file of images) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dlihbuwsi/image/upload`,
          { method: "POST", body: formData }
        );

        const data = await res.json();

        if (!data.secure_url) {
          throw new Error("Cloudinary upload failed");
        }

        uploadedImages.push(data.secure_url);
      }

      // Save product to Firebase
      const response = await api.post("/products.json", {
        name,
        price,
        shtok,
        desc,
        category,
        images: uploadedImages,
      });

      return response.data;
    } catch (error) {
      console.log("UPLOAD ERROR:", error);
      showError(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ============================ GET PRODUCTS ============================

export const get_products = createAsyncThunk(
  "products/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products.json");
      return response.data;
    } catch (error) {
      console.log("GET ERROR:", error);
      return rejectWithValue(error.message);
    }
  }
);

// ============================ INITIAL STATE ============================

const initialState = {
  loading: false,
  success: false,
  error: false,
  reportError: "",

  products: [],
  get_loading: false,
  get_success: false,
  get_error: false,
  get_reportError: "",

  id: "",
};

// ============================ SLICE ============================

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    edit: (state, action) => {
      state.id = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder

      // -------- UPLOAD CASES --------
      .addCase(upload_products.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(upload_products.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        showSuccess("Product Uploaded Successfully");
      })
      .addCase(upload_products.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.reportError = action.payload;
      })

      // -------- GET PRODUCTS CASES --------
      .addCase(get_products.pending, (state) => {
        state.get_loading = true;
        state.get_success = false;
      })
      .addCase(get_products.fulfilled, (state, action) => {
        state.get_loading = false;
        state.get_success = true;

        const data = action.payload;

        if (!data) {
          state.products = [];
          return;
        }

        // Convert Firebase Object → Array
        state.products = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
      })
      .addCase(get_products.rejected, (state, action) => {
        state.get_loading = false;
        state.get_error = true;
        state.get_reportError = action.payload;
      });
  },
});

export const { edit } = productSlice.actions;
export default productSlice.reducer;
