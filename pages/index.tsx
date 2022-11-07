import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrenciesData } from "../src/store/currencies/currencies-actions";
import { CurrenciesList } from "../src/components/currencies/currenciesList/CurrenciesList";
import { SearchBar } from "../src/components/currencies/searchBar/SearchBar";
//types
import { AppDispatch } from "../src/store/store";
import { RootState } from "../src/store/store";
import { useRouter } from "next/router";
import { currenciesActions } from "../src/store/currencies/currencies-slice";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { CurrencyItem } from "../src/types/types";

let isFirstLoading = true;
function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const test = useSelector((state: RootState) => state.currencies.test);
  const routerQuery = router.query.page;

  const isHome = router.asPath === "/" && 1;
  const isQuery = typeof routerQuery === "string" ? routerQuery : 1;
  const page = isHome || isQuery;

  const getCurrenecies = async () => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
    );
    const data = res.json();
    return data;
  };
  const query = useQuery(["currencies", page], getCurrenecies);
  const { data } = query;
  // console.log(query.data);
  useEffect(() => {
    if (page in test) {
      dispatch(
        currenciesActions.setVisibleItems({
          items: test[page],
        })
      );
      return;
    }
    if (query.status === "success") {
      dispatch(
        currenciesActions.setItems({
          items: data,
          key: page,
        })
      );
    }
  }, [dispatch, router, page, query.status]);

  return (
    <>
      {/* <TrendingStatsBox /> */}
      <SearchBar />
      <CurrenciesList />
    </>
  );
}

export default HomePage;
