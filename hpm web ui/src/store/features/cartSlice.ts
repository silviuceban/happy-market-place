import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';

import { Product } from '../../models/product';

export interface ProductInCart {
  product: Product;
  quantity: number;
}

//cart modal pt desktop

//adaug pagina de produs

export interface CartState {
  cart: ProductInCart[];

  isLoading: boolean;
  error: null | unknown;
}

const initialState: CartState = {
  cart: [],

  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const index = state.cart
        .map((item) => item.product.id)
        .indexOf(action.payload.product.id);

      if (index !== -1) {
        state.cart[index].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.product.id !== action.payload
      );
    },
    changeQuantity(state, action) {
      const index = state.cart
        .map((item) => item.product.id)
        .indexOf(action.payload.id);

      if (index !== -1) {
        if (action.payload.change === 'increase') {
          state.cart[index].quantity += 1;
        } else {
          if (state.cart[index].quantity > 1) {
            state.cart[index].quantity -= 1;
          } else {
            state.cart = state.cart.filter(
              (item) => item.product.id !== action.payload.id
            );
          }
        }
      }
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const { addProduct, removeProduct, changeQuantity } = cartSlice.actions;

// selectors
export const selectProductsInCart = (root: RootState): ProductInCart[] =>
  root.cart.cart;

export const selectIsLoading = (root: RootState): boolean =>
  root.cart.isLoading;
