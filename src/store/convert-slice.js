import { createSlice } from "@reduxjs/toolkit";

export const convertSlice = createSlice({
  name: "convert",
  initialState: {
    quantity: 1,
    itemFrom: { id: "", price: 0, name: "" },
    itemTo: { id: "", price: 0, name: "" },
    result: 0,
    warning: false,
  },
  reducers: {
    changeQuantity(state, action) {
      state.quantity = action.payload;
    },
    setValue(state, action) {
      if (action.payload.kind === "from") {
        state.itemFrom = action.payload.item;
      }
      if (action.payload.kind === "to") {
        state.itemTo = action.payload.item;
      }
    },
    convertData(state) {
      const totalQuantity = state.itemFrom.price * state.quantity;
      console.log(totalQuantity);

      const result = totalQuantity / state.itemTo.price;
      state.result = result;
    },
  },
});

export const convertActions = convertSlice.actions;
