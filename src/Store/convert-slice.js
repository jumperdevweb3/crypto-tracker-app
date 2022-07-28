import { createSlice } from "@reduxjs/toolkit";

export const convertSlice = createSlice({
  name: "convert",
  initialState: {
    leftValue: 1,
    rightValue: 1,
    leftSide: { price: 0, id: "", name: "" },
    rightSide: { price: 0, id: "", name: "" },
    result: 0,
    warning: false,
  },
  reducers: {
    setValue(state, action) {
      if (action.payload.kind === "left") {
        state.leftSide = action.payload.item;
      }
      if (action.payload.kind === "right") {
        state.rightSide = action.payload.item;
      }
      console.log(action.payload);
    },
    setMultiplier(state, action) {
      if (action.payload.kind === "left") {
        state.leftValue = action.payload.value;
      }
      if (action.payload.kind === "right") {
        state.rightValue = action.payload.value;
      }
    },
    convertData(state) {
      const leftMultipler = state.leftValue * state.leftSide.price;
      const rightMultipler = state.rightValue * state.rightSide.price;
      state.result = leftMultipler / rightMultipler;
    },
    setWarning(state, action) {
      state.warning = action.payload;
    },
  },
});

export const convertActions = convertSlice.actions;
