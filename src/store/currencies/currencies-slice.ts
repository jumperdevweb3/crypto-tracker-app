import { createSlice } from "@reduxjs/toolkit";
import { ICurrencyItem } from "../../types/types";
import { sortCurrencies } from "../../helpers/sortCurrencies";

interface CurrenciesState {
  trendingItems: ICurrencyItem[];
  losersItems: ICurrencyItem[];
  gainersItems: ICurrencyItem[];
  sortActive: {
    sortType: string;
    sortBy: string;
  };
}
const currenciesSlice = createSlice({
  name: "currencies",
  initialState: {
    trendingItems: [],
    losersItems: [],
    gainersItems: [],
    sortActive: {
      sortType: "ascending",
      sortBy: "market_cap_rank",
    },
  } as CurrenciesState,
  reducers: {
    updateSort(state, action) {
      state.sortActive = action.payload;
    },
    setTrends(state, action) {
      const items: ICurrencyItem[] = action.payload.filter(
        (item: ICurrencyItem, index: number) => {
          return action.payload.indexOf(item) === index;
        }
      );
      state.trendingItems = sortCurrencies(items, {
        sortType: "descending",
        sortBy: "price_change_7d",
      }).slice(0, 100);
      state.losersItems = sortCurrencies(items, {
        sortType: "ascending",
        sortBy: "price_change_24h",
      }).slice(0, 100);
      state.gainersItems = sortCurrencies(items, {
        sortType: "descending",
        sortBy: "price_change_24h",
      }).slice(0, 100);
    },
  },
});

export const currenciesActions = currenciesSlice.actions;
export default currenciesSlice;
