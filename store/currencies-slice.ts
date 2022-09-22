import { createSlice } from "@reduxjs/toolkit";
import { getApiData } from "../components/utils/getApiData";
import { sortCurrencies } from "./currencies-actions";
import { CurrenciesState } from "../types/types";
import { CurrencyItem } from "../types/types";

const sliceVisivleItems = (
  passedItems: CurrencyItem[],
  page: string | undefined
) => {
  let slicedItems = [] as CurrencyItem[];
  if (!page) {
    slicedItems = passedItems.slice(0, 50);
  }
  if (page === undefined || page === "/") {
    slicedItems = passedItems.slice(0, 50);
  }
  if (page === "/?page=1") {
    slicedItems = passedItems.slice(0, 50);
  }
  if (page === "/?page=2") {
    slicedItems = passedItems.slice(51, 100);
  }
  if (page === "/?page=3") {
    slicedItems = passedItems.slice(101, 150);
  }
  if (page === "/?page=4") {
    slicedItems = passedItems.slice(151, 200);
  }
  if (page === "/?page=5") {
    slicedItems = passedItems.slice(201, 250);
  }
  return slicedItems;
};

const currenciesSlice = createSlice({
  name: "currencies",
  initialState: {
    items: [],
    visibleItems: [],
    trendingItems: [],
    losersItems: [],
    gainersItems: [],
    chartData: [],
    chartIsUpdating: false,
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
      state.items = items;
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
    setVisibleItems(state, action) {
      const { items, page } = action.payload;
      const slicedItems = sliceVisivleItems(items, page);
      state.visibleItems = sortCurrencies(slicedItems, state.sortActive);
    },
    sortData(state) {
      state.visibleItems = sortCurrencies(state.visibleItems, state.sortActive);
    },
    updateSort(state, action) {
      state.sortActive = action.payload;
    },
    setChart(state, action) {
      state.chartData = action.payload;
    },
    setLoading(state, action) {
      state.chartIsUpdating = action.payload;
    },
  },
});

export const currenciesActions = currenciesSlice.actions;
export default currenciesSlice;
