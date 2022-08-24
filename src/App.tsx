import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrenciesData } from "./store/currencies-actions";
import { Route } from "react-router-dom";
import "./App.scss";
import { Layout } from "./components/layout/Layout";
import { Convert } from "./components/pages/Convert";
import { Home } from "./components/pages/Home";
import { Watchlist } from "./components/pages/Watchlist";
import { watchlistActions } from "./store/watchlist-slice";
import { WalletTracker } from "./components/pages/WalletTracker";
import { Footer } from "./components/ui/Footer";
//types
import { AppDispatch } from "./store/index";
import { RootState } from "./store/index";

let isFirstLoading = true;

function App() {
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
    <div className="App">
      <Layout>
        <Route path="/" exact>
          <Home />
          <Footer />
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
