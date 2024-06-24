import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  subTotal : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const { name, quantity, price, image } = payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.name === name
      );
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += quantity;
      } else {
        state.cartItems.push({ name, quantity, price, image});
      }
      state.subTotal += quantity * price;
    },
    removeFromCart: (state, { payload }) => {
        const { name } = payload;
        const itemToRemove = state.cartItems.find((item) => item.name === name);
        if (itemToRemove) {
          state.subTotal -= itemToRemove.quantity * itemToRemove.price;
          state.cartItems = state.cartItems.filter(
            (item) => item.name !== name
          );
        }
      },
    clearCart: (state) => {
      state.cartItems = [];
      state.subTotal = 0;
    },

    updateCartItemQuantity: (state, { payload }) => {
        const { name, quantity } = payload;
        const itemToUpdate = state.cartItems.find((item) => item.name === name);
        if (itemToUpdate) {
          const quantityDifference = quantity - itemToUpdate.quantity;
          itemToUpdate.quantity = quantity;
          state.subTotal += quantityDifference * itemToUpdate.price;
        }
      },
  },
});

export const { addToCart, removeFromCart, clearCart , updateCartItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;

