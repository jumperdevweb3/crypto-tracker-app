import { createSlice } from "@reduxjs/toolkit";
import { StatisticTypes } from "../types/types";

export const statisticSlice = createSlice({
  name: "statistic",
  initialState: {
    exchanges: { items: [], errorMessage: "" },
    companies: { items: [], errorMessage: "" },
    nfts: { items: [], errorMessage: "" },
    isLoading: false,
  } as StatisticTypes,
  reducers: {
    setExchanges(state, action) {
      state.exchanges.items = action.payload;
    },
    setCompanies(state, action) {
      state.companies.items = action.payload;
    },
    setNftsList(state, action) {
      state.nfts.items = action.payload;
    },
    setError(state, action) {
      if (action.payload.from === "companies") {
        state.companies.errorMessage = action.payload.message;
      }
      if (action.payload.from === "exchanges") {
        state.exchanges.errorMessage = action.payload.message;
      }
      if (action.payload.from === "nfts") {
        state.nfts.errorMessage = action.payload.message;
      }
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const statisticActions = statisticSlice.actions;
