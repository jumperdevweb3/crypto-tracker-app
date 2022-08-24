import { createSlice } from "@reduxjs/toolkit";
import { getApiData } from "../components/utils/getApiData";
import { CurrenciesState } from "../components/types/types";
import { CurrencyItem } from "../components/types/types";

const sortCurrencies = (
  items: CurrencyItem[],
  { sortType, sortBy }: { sortType: string; sortBy: string }
) => {
  if (sortType === "ascending") {
    if (sortBy === "name") {
      return [...items].sort((a: any, b: any): any =>
        (b[sortBy] || "").toString().localeCompare((a[sortBy] || "").toString())
      );
    }
    return [...items].sort(
      (a, b) => a[sortBy as keyof {}] - b[sortBy as keyof {}]
    );
  }
  if (sortType === "descending") {
    if (sortBy === "name") {
      return [...items].sort((a: any, b: any): any =>
        (a[sortBy] || "").toString().localeCompare((b[sortBy] || "").toString())
      );
    }
    return [...items].sort(
      (a, b) => b[sortBy as keyof {}] - a[sortBy as keyof {}]
    );
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
  } as CurrenciesState,
  reducers: {
    setItems(state, action) {
      const items = action.payload.map((item: CurrencyItem) =>
        getApiData(item)
      );
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
