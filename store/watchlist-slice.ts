import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { watchItems: [] },
  reducers: {
    updateItems(state, action) {
      const existId = state.watchItems.findIndex(
        (item: { id: string }) => item.id === action.payload.id
      );
      const existitem = state.watchItems[existId];
      if (existitem) {
        state.watchItems = state.watchItems.filter(
          (item: { id: string }) => action.payload.id !== item.id
        );
        return;
      }
      state.watchItems = state.watchItems.concat(action.payload);
    },
    setItem(state, action) {
      state.watchItems = action.payload;
    },
  },
});

export const watchlistActions = watchlistSlice.actions;
export default watchlistSlice;
