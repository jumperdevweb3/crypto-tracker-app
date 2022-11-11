import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui/ui-slice";
import currenciesSlice from "./currencies/currencies-slice";
import watchlistSlice from "./watchlist/watchlist-slice";
import { convertSlice } from "./converter/convert-slice";

const store = configureStore({
  reducer: {
    uiSlice: uiSlice.reducer,
    currencies: currenciesSlice.reducer,
    watchlist: watchlistSlice.reducer,
    convert: convertSlice.reducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
