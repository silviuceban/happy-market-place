import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { Product } from '../../models/product';
import { getProducts } from '../../services/api/productsService';

export const productsThunk = createAsyncThunk(
  'products/getProducts',
  async (params: { take?: number; skip?: number }) => {
    try {
      const products = await getProducts(params);

      return products;
    } catch (err) {
      throw err;
    }
  }
);

export interface ProductsState {
  products: Product[];
  productsToDisplay: number;
  isLoading: boolean;
  error: null | unknown;
}

const initialState: ProductsState = {
  products: [],
  productsToDisplay: 10,
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeDisplayedProducts: (state, action) => {
      state.productsToDisplay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(productsThunk.fulfilled, (state, { payload: products }) => {
        state.isLoading = false;
        state.error = null;
        state.products = products;
      })
      .addCase(productsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const productsReducer = productsSlice.reducer;

export const { changeDisplayedProducts } = productsSlice.actions;

// selectors
export const selectProducts = (root: RootState): Product[] =>
  root.products.products;

export const selectProductsToDisplay = (root: RootState): number =>
  root.products.productsToDisplay;

export const selectIsLoading = (root: RootState): boolean =>
  root.products.isLoading;
