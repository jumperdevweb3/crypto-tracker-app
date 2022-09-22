import { createSlice } from "@reduxjs/toolkit";
import { sortCurrencies } from "./currencies-slice";
//types
import { WatchlistState } from "../components/types/types";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchItems: [],
    sortActive: {
      sortType: "ascending",
      sortBy: "market_cap_rank",
    },
  } as WatchlistState,
  reducers: {
    updateItems(state, action) {
      const existId = state.watchItems.findIndex(
        (item: { id: string }) => item.id === action.payload.id
      );
      const existItem = state.watchItems[existId];
      if (existItem) {
        state.watchItems = state.watchItems.filter(
          (item: { id: string }) => action.payload.id !== item.id
        );
        return;
      }
      state.watchItems = state.watchItems.concat(action.payload);
    },
    setItem(state, action) {
      state.watchItems = sortCurrencies(action.payload, state.sortActive);
    },
    sortData(state) {
      state.watchItems = sortCurrencies(state.watchItems, state.sortActive);
    },
    updateSort(state, action) {
      state.sortActive = action.payload;
    },
  },
});

export const watchlistActions = watchlistSlice.actions;
export default watchlistSlice;
