import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CurrenciesSortMenu } from "./currenciesSortMenu/CurrenciesSortMenu";
import CoinCard from "../../cards/coinCard/CoinCard";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import classes from "./CurrenciesList.module.scss";
import { RootState } from "../../../store/store";
import { PaginationBar } from "./paginationBar/PaginationBar";
import { useQuery } from "react-query";
import { getCurrenecies } from "./getCurrencies";
import { useRouter } from "next/router";
import { CurrencyItem } from "../../../types/types";
import { getApiData } from "../../../utils/getApiData";
import { sortCurrencies } from "../../../helpers/sortCurrencies";
export const CurrenciesList = () => {
  const [page, setPage] = useState(1);

  const router = useRouter();

  const { sortActive } = useSelector((state: RootState) => state.currencies);
  const { data, isError, isLoading, status, isPreviousData } = useQuery<
    CurrencyItem[]
  >(["currencies", page], () => getCurrenecies(page), {
    keepPreviousData: true,
    refetchInterval: 35000,
  });

  useEffect(() => {
    if (typeof router.query.page === "string") {
      setPage(+router.query.page);
    }
    if (router.asPath === "/") {
      setPage(1);
    }
  }, [router]);

  const LoadingContent = isLoading && !isPreviousData && <LoadingSpinner />;
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
  const NotFoundContent = !items.length && !isLoading && !isError && (
    <p className="center">Not found items.</p>
  );

  const ErrorContent = isError && <p className="center">Fetch data faild.</p>;
  return (
    <>
      <div className={classes["market-list"]}>
        {SortMenu}
        {NotFoundContent}
        {ErrorContent}
        {LoadingContent}
        {CurrenciesContent}
      </div>
      {!isError && (
        <PaginationBar
          isLoading={isLoading}
          disabled={isPreviousData || !data}
          page={page}
        />
      )}
    </>
  );
};
