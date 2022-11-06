import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrenciesData } from "../src/store/currencies/currencies-actions";
import { TrendingStatsBox } from "../src/components/currencies/stats/TrendingStatsBox";
import { CurrenciesList } from "../src/components/currencies/currenciesList/CurrenciesList";
import { SearchBar } from "../src/components/currencies/searchBar/SearchBar";
//types
import { AppDispatch } from "../src/store/store";
import { RootState } from "../src/store/store";
import { useRouter } from "next/router";
import { currenciesActions } from "../src/store/currencies/currencies-slice";

let isFirstLoading = true;
function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const test = useSelector((state: RootState) => state.currencies.test);
  const isHome = router.asPath === "/";
  const isQuery = typeof router.query.page === "string" ? router.query.page : 1;

  const page = isHome ? 1 : isQuery;

  useEffect(() => {
    if (page in test) {
      dispatch(
        currenciesActions.setVisibleItems({
          items: test[page],
        })
      );
      return;
    }
    dispatch(fetchCurrenciesData(false, page));
  }, [dispatch, router]);

  return (
    <>
      <TrendingStatsBox />
      <SearchBar />
      <CurrenciesList />
    </>
  );
}

export default HomePage;
