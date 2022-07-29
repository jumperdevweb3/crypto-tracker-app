import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrenciesData } from "./Store/currencies-actions";
import { Route } from "react-router-dom";
import "./App.scss";
import { Layout } from "./components/Layout/Layout";
import { Convert } from "./components/Pages/Convert";
import { Home } from "./components/Pages/Home";
import { Watchlist } from "./components/Pages/Watchlist";
import { watchlistActions } from "./Store/watchlist-slice";
import { WalletTracker } from "./components/Pages/WalletTracker";

let isFirstLoading = true;

function App() {
  const currenciesData = useSelector((state) => state.currencies.items);
  const data = useSelector((state) => state.watchlist.watchItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currenciesData.length === 0) {
      dispatch(fetchCurrenciesData(isFirstLoading));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("currencies", JSON.stringify(currenciesData));
  }, [currenciesData]);

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
    <div className="App">
      <Layout>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/watchlist">
          <Watchlist />
        </Route>
        <Route path="/convert">
          <Convert />
        </Route>
        <Route path="/wallet-tracker">
          <WalletTracker />
        </Route>
      </Layout>
    </div>
  );
}

export default App;
