import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { watchItems: [] },
  reducers: {
    updateItems(state, action) {
      state.watchItems.push(action.payload);
    },
  },
});

export const watchlistActions = watchlistSlice.actions;
export default watchlistSlice;
