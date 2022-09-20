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
    setVisibleItems(state, action) {
      const { items, page } = action.payload;
      state.visibleItems = sliceVisivleItems(items, page);
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
  },
});

export const currenciesActions = currenciesSlice.actions;
export default currenciesSlice;
