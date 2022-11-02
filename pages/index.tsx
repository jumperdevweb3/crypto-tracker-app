import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrenciesData } from "../src/store/currencies/currencies-actions";
import { TrendingStatsBox } from "../src/components/currencies/stats/TrendingStatsBox";
import { CurrenciesList } from "../src/components/currencies/currenciesList/CurrenciesList";
import { SearchBar } from "../src/components/currencies/searchBar/SearchBar";
//types
import { AppDispatch } from "../src/store/store";
import { RootState } from "../src/store/store";

let isFirstLoading = true;
function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const currenciesData = useSelector(
    (state: RootState) => state.currencies.items
  );

  useEffect(() => {
    if (currenciesData.length === 0) {
      dispatch(fetchCurrenciesData(isFirstLoading));
    }
  }, [dispatch]);

  return (
    <>
      <TrendingStatsBox />
      <SearchBar />
      <CurrenciesList />
    </>
  );
}

export default HomePage;
