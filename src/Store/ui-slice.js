import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: { message: "" },
    isLoading: false,
    showNav: false,
  },
  reducers: {
    showNotification(state, action) {
      state.notification = { message: action.payload.message };
    },
    showLoading(state, action) {
      state.isLoading = action.payload;
    },
    showNavigation(state, action) {
      state.showNav = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
