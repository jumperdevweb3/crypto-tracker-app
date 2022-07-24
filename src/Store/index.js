import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import currenciesSlice from "./currencies-slice";

const store = configureStore({
  reducer: {
    uiSlice: uiSlice.reducer,
    currencies: currenciesSlice.reducer,
  },
});
export default store;
