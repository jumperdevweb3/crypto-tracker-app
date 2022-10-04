import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import currenciesSlice from "./currencies-slice";
import watchlistSlice from "./watchlist-slice";
import { convertSlice } from "./convert-slice";
import { scannerSlice } from "./etherscan-slice";
import { statisticSlice } from "./statistic-slice";

const store = configureStore({
  reducer: {
    uiSlice: uiSlice.reducer,
    currencies: currenciesSlice.reducer,
    watchlist: watchlistSlice.reducer,
    convert: convertSlice.reducer,
    scanner: scannerSlice.reducer,
    statistic: statisticSlice.reducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
