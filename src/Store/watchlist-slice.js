import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { watchItems: [] },
  reducers: {
    updateItems(state, action) {
      state.watchItems.push(action.payload);
    },
    removeItem(state, action) {
      state.watchItems.filter((item) => item.id !== action.payload);
    },
  },
});

export const watchlistActions = watchlistSlice.actions;
export default watchlistSlice;
