import { createSlice } from "@reduxjs/toolkit";

export const convertSlice = createSlice({
  name: "convert",
  initialState: {
    leftValue: 0,
    rightValue: 0,
    leftSide: { price: 0, id: "", name: "" },
    rightSide: { price: 0, id: "", name: "" },
    result: 0,
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
  },
});

export const convertActions = convertSlice.actions;
