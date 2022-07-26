import { createSlice } from "@reduxjs/toolkit";

export const convertSlice = createSlice({
  name: "convert",
  initialState: { something: "" },
  reducers: {
    test() {},
  },
});

export const convertActions = convertSlice.actions;
