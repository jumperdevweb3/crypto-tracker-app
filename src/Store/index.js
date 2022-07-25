import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import currenciesSlice from "./currencies-slice";
import watchlistSlice from "./watchlist-slice";

const store = configureStore({
  reducer: {
    uiSlice: uiSlice.reducer,
    currencies: currenciesSlice.reducer,
    watchlist: watchlistSlice.reducer,
  },
});
export default store;
