import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrenciesData } from "../store/currencies-actions";
import { Footer } from "../components/ui/Footer";
import { StatsBox } from "../components/currencies/stats/StatsBox";
import { CurrenciesList } from "../components/currencies/CurrenciesList";
import { SearchBar } from "../components/currencies/searchBar/SearchBar";
//types
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";

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
      <StatsBox />
      <SearchBar />
      <CurrenciesList />
      <Footer />
    </>
  );
}

export default HomePage;
