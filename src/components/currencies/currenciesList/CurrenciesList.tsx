import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currenciesActions } from "../../../store/currencies/currencies-slice";
import { CurrenciesSortMenu } from "./currenciesSortMenu/CurrenciesSortMenu";
import CoinCard from "../../cards/coinCard/CoinCard";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import classes from "./CurrenciesList.module.scss";
import { RootState } from "../../../store/store";
import { AppDispatch } from "../../../store/store";
import { PaginationBar } from "./pagination/PaginationBar";
import { useQuery } from "react-query";
import { getCurrenecies } from "./getCurrencies";
import { useRouter } from "next/router";
import { CurrencyItem } from "../../../types/types";
import { getApiData } from "../../../utils/getApiData";
import { sortCurrencies } from "../../../helpers/sortCurrencies";
export const CurrenciesList = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const routerQuery = router.query.page;
  const isHome = router.asPath === "/" && 1;
  const isQuery = typeof routerQuery === "string" ? routerQuery : 1;
  const currentPage = isHome || isQuery;

  const { sortActive, test } = useSelector(
    (state: RootState) => state.currencies
  );
  const { data, isError, isLoading, status, isPreviousData } = useQuery<
    CurrencyItem[]
  >(["currencies", currentPage], () => getCurrenecies(currentPage), {
    keepPreviousData: true,
  });

  useEffect(() => {
    if (currentPage in test) {
      dispatch(
        currenciesActions.setVisibleItems({
          items: test[currentPage],
        })
      );
      return;
    }
    if (status === "success") {
      dispatch(
        currenciesActions.setItems({
          items: data,
          key: currentPage,
        })
      );
    }
  }, [dispatch, router, currentPage, status]);

  const items =
    status === "success"
      ? sortCurrencies(
          data.map((item) => getApiData(item) as CurrencyItem),
          sortActive
        )
      : [];

  const ItemsRender = items.map((item) => {
    return <CoinCard key={item.id} item={item} />;
  });
  const SortMenu = !isError && <CurrenciesSortMenu page={"home"} />;
  const CurrenciesContent = !isLoading && ItemsRender;
  const NotFoundContent = !items.length && !isLoading && (
    <p className="center">Not found items.</p>
  );

  const ErrorContent = isError && <p className="center">Fetch data faild.</p>;
  return (
    <>
      <div className={classes["market-list"]}>
        {NotFoundContent}
        {ErrorContent}
        {SortMenu}
        {CurrenciesContent}
      </div>
      {!isError && (
        <PaginationBar
          isLoading={isLoading}
          disabled={isPreviousData || !data}
        />
      )}
    </>
  );
};
