import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;

      const existing = state.items.find((item) => item.name === plant.name);

      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        state.items.push({ ...plant, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter((item) => item.name !== name);
    },

    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;

      const item = state.items.find((i) => i.name === name);
      if (!item) return;

      const qty = Number(amount);
      if (Number.isNaN(qty)) return;

      if (qty <= 0) {
        state.items = state.items.filter((i) => i.name !== name);
      } else {
        item.quantity = qty;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;