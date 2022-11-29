import { createSlice } from "@reduxjs/toolkit";
import { sortCurrencies } from "@/helpers/sortCurrencies";
import { ICurrencyItem } from "@/types/types";

interface WatchlistState {
  items: ICurrencyItem[];
  watchIds: string[];
  sortActive: {
    sortType: string;
    sortBy: string;
  };
}

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: [],
    watchIds: [],
    sortActive: {
      sortType: "ascending",
      sortBy: "market_cap_rank",
    },
  } as WatchlistState,
  reducers: {
    setIds(state, action) {
      state.watchIds = action.payload;
    },
    setItems(state, action) {
      state.items = sortCurrencies(action.payload, state.sortActive);
    },
    updateItems(state, action) {
      const existId = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existItem = state.items[existId];
      if (existItem) {
        state.items = state.items.filter((item) => action.payload !== item.id);
        return;
      }
    },
    updateIds(state, action) {
      const existId = state.watchIds.findIndex(
        (item) => item === action.payload
      );
      const existItem = state.watchIds[existId];
      if (existItem) {
        state.watchIds = state.watchIds.filter(
          (item) => action.payload !== item
        );
        return;
      }
      state.watchIds = state.watchIds.concat(action.payload);
    },
    sortData(state) {
      state.items = sortCurrencies(state.items, state.sortActive);
    },
    updateSort(state, action) {
      state.sortActive = action.payload;
    },
  },
});

export const watchlistActions = watchlistSlice.actions;
export default watchlistSlice;
