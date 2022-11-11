import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showNav: false,
  },
  reducers: {
    showNavigation(state, action) {
      state.showNav = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
