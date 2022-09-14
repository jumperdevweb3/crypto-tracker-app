import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrenciesData } from "../store/currencies-actions";
import { Footer } from "../components/ui/Footer";
import { StatsBox } from "../components/currencies/StatsBox";
import { CurrenciesList } from "../components/currencies/CurrenciesList";
//types
import { AppDispatch } from "../store/index";
import { RootState } from "../store/index";

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
      <CurrenciesList />
      <Footer />
    </>
  );
}

export default HomePage;
