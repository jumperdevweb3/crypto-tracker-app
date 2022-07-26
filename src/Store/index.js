import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import currenciesSlice from "./currencies-slice";
import watchlistSlice from "./watchlist-slice";
import { convertSlice } from "./convert-slice";

const store = configureStore({
  reducer: {
    uiSlice: uiSlice.reducer,
    currencies: currenciesSlice.reducer,
    watchlist: watchlistSlice.reducer,
    convert: convertSlice.reducer,
  },
});
export default store;
