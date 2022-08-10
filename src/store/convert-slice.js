import { createSlice } from "@reduxjs/toolkit";

export const convertSlice = createSlice({
  name: "convert",
  initialState: {
    quantityFrom: "",
    quantityTo: "",
    priceFrom: {},
    priceTo: {},
    result: 0,
    warning: false,
  },
  reducers: {
    setValue(state, action) {
      if (action.payload.kind === "from") {
        state.priceFrom = action.payload.item;
      }
      if (action.payload.kind === "to") {
        state.priceTo = action.payload.item;
      }
    },
    setMultiplier(state, action) {
      if (action.payload.kind === "from") {
        state.quantityFrom = action.payload.value;
      }
      if (action.payload.kind === "to") {
        state.quantityTo = action.payload.value;
      }
    },
    convertData(state, action) {
      const priceFromMultipler = state.quantityFrom * state.priceFrom.price;
      const priceToMultipler = state.quantityTo * state.priceTo.price;
      // if (action.payload === "from") {
      //   state.quantityFrom = priceFromMultipler;
      // }
      // if (action.payload === "to") {
      //   state.quantityTo = priceToMultipler;
      // }
    },
    setWarning(state, action) {
      state.warning = action.payload;
    },
  },
});

export const convertActions = convertSlice.actions;
