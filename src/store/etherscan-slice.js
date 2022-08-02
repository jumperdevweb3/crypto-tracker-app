import { createSlice } from "@reduxjs/toolkit";

export const scannerSlice = createSlice({
  name: "scanner",
  initialState: { result: 0, errorMessage: "", isLoading: false },
  reducers: {
    setResult(state, action) {
      state.result = action.payload;
    },
    setErrorMsg(state, action) {
      state.errorMessage = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const scannerActions = scannerSlice.actions;
