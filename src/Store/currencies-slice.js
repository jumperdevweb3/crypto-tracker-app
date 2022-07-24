import { createSlice } from "@reduxjs/toolkit";

const currenciesSlice = createSlice({
  name: "currencies",
  initialState: {
    items: [],
    sortActive: { sortType: "" },
  },
  reducers: {
    pushItems(state, action) {
      state.items = action.payload;
    },
    sortData(state, action) {
      if (action.payload.type === "ascending") {
        state.sortActive.sortType = action.payload.type;
        const items = action.payload.items;
        const sortedData = items
          .slice()
          .sort((a, b) => a.market_cap_rank - b.market_cap_rank);
        state.items = sortedData;
      }
      if (action.payload.type === "descending") {
        state.sortActive.sortType = action.payload.type;
        const items = action.payload.items;
        const sortedData = items
          .slice()
          .sort((a, b) => b.market_cap_rank - a.market_cap_rank);
        state.items = sortedData;
      }
    },
  },
});

export const currenciesActions = currenciesSlice.actions;
export default currenciesSlice;
