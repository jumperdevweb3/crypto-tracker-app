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
    onOptionChange(state, action) {
      if (action.payload.kind === "to") state.itemTo.id = action.payload.id;
      if (action.payload.kind === "from") state.itemFrom.id = action.payload.id;
    },
    setValue(state, action) {
      if (action.payload.kind === "from") state.itemFrom = action.payload.item;
      if (action.payload.kind === "to") state.itemTo = action.payload.item;
    },
    convertData(state) {
      const totalQuantity = state.itemFrom.price * state.quantity;
      const result = totalQuantity / state.itemTo.price;
      state.result = +result.toFixed(4).replace(/\.?0+$/, "");
    },
    swap(state) {
      const prev = state.itemFrom;

      state.itemFrom = state.itemTo;
      state.itemTo = prev;
      state.quantity = state.result < 0 ? 1 : state.result;
    },
    setWarning(state, action) {
      state.warning = action.payload;
    },
  },
});

export const convertActions = convertSlice.actions;
