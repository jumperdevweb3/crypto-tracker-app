import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrenciesData } from "../store/currencies-actions";
import { watchlistActions } from "../store/watchlist-slice";
import { Footer } from "../components/ui/Footer";
import { StatsBox } from "../components/currencies/StatsBox";
import { CurrenciesList } from "../components/currencies/CurrenciesList";
//types
import { AppDispatch } from "../store/index";
import { RootState } from "../store/index";

let isFirstLoading = true;

function HomePage() {
  const currenciesData = useSelector(
    (state: RootState) => state.currencies.items
  );
  const data = useSelector((state: RootState) => state.watchlist.watchItems);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (currenciesData.length === 0) {
      dispatch(fetchCurrenciesData(isFirstLoading));
    }
  }, [dispatch]);

  useEffect(() => {
    const local = localStorage.getItem("watchlist");
    if (local !== null) {
      dispatch(watchlistActions.setItem(JSON.parse(local)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <StatsBox />
      <CurrenciesList />
      <Footer />
    </>
  );
}

export default HomePage;
