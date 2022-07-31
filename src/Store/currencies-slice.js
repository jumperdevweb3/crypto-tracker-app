import { createSlice } from "@reduxjs/toolkit";
import { getApiData } from "../components/utils/getApiData";

const sortCurrencies = (items, { sortType, sortBy }) => {
  if (sortType === "ascending") {
    return [...items].sort((a, b) => a[sortBy] - b[sortBy]);
  }
  if (sortType === "descending") {
    return [...items].sort((a, b) => b[sortBy] - a[sortBy]);
  }

  return items;
};

const currenciesSlice = createSlice({
  name: "currencies",
  initialState: {
    items: [],
    trendingItems: [],
    losersItems: [],
    gainersItems: [],
    chartData: [],
    sortActive: {
      sortType: "ascending",
      sortBy: "market_cap_rank",
    },
  },
  reducers: {
    setItems(state, action) {
      const items = action.payload.map((item) => getApiData(item));
      state.items = sortCurrencies(items, state.sortActive);
      state.trendingItems = sortCurrencies(state.items, {
        sortType: "descending",
        sortBy: "price_change_7d",
      });
      state.losersItems = sortCurrencies(state.items, {
        sortType: "ascending",
        sortBy: "price_change_24h",
      });
      state.gainersItems = sortCurrencies(state.items, {
        sortType: "descending",
        sortBy: "price_change_24h",
      });
    },
    sortData(state) {
      state.items = sortCurrencies(state.items, state.sortActive);
    },
    updateSort(state, action) {
      state.sortActive = action.payload;
    },
    setChart(state, action) {
      state.chartData = action.payload;
    },
  },
});

export const currenciesActions = currenciesSlice.actions;
export default currenciesSlice;
