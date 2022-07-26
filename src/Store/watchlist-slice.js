import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { watchItems: [] },
  reducers: {
    updateItems(state, action) {
      const existId = state.watchItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const existitem = state.watchItems[existId];
      if (existitem) {
        state.watchItems = state.watchItems.filter(
          (item) => action.payload.id !== item.id
        );
        return;
      }
      state.watchItems.push(action.payload);
    },
  },
});

export const watchlistActions = watchlistSlice.actions;
export default watchlistSlice;
