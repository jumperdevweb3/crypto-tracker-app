import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CurrenciesSortMenu } from "./currenciesSortMenu/CurrenciesSortMenu";
import CoinCard from "../../cards/coinCard/CoinCard";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import classes from "./CurrenciesList.module.scss";
import { RootState } from "@/store/store";
import { PaginationBar } from "../paginationBar/PaginationBar";
import { useQuery } from "react-query";
import { getCurrenecies } from "./getCurrencies";
import { ICurrencyItem } from "@/types/types";
import { changeDataVariables } from "./changeDataVariables";
import { sortCurrencies } from "@/helpers/sortCurrencies";

const getParams = () => {
  return new URLSearchParams(window.location.search);
};

export const CurrenciesList = () => {
  const [page, setPage] = useState<number>(1);
  const firstRender = useRef(true);
  const { sortActive } = useSelector((state: RootState) => state.currencies);

  const { data, isError, isLoading, status, isPreviousData } = useQuery<
    ICurrencyItem[]
  >(["currencies", page], () => getCurrenecies(page, 100), {
    keepPreviousData: true,
    refetchInterval: 35000,
  });

  useEffect(() => {
    const params = getParams();
    const pageParam = params.get("page");

    if (pageParam && !Number.isNaN(parseInt(pageParam))) {
      setPage(+pageParam);
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const params = getParams();

    params.set("page", `${page}`);
    history.replaceState(null, "", `?${params.toString()}`);
  }, [page]);

  const changePage = (page: number) => {
    setPage(page);
  };

  const sortItems =
    status === "success"
      ? sortCurrencies(
          data.map((item) => changeDataVariables(item) as ICurrencyItem),
          sortActive
        )
      : [];

  const LoadingContent = isLoading && !isPreviousData && <LoadingSpinner />;

  const ItemsRender = sortItems.map((item) => {
    return <CoinCard key={item.id} item={item} />;
  });
  const SortMenu = !isError && !isLoading && (
    <CurrenciesSortMenu page={"home"} />
  );
  const CurrenciesContent = !isLoading && ItemsRender;
  const NotFoundContent = !sortItems.length && !isLoading && !isError && (
    <p className="center">Not found items.</p>
  );
  const ErrorContent = isError && <p className="center">Fetch data faild.</p>;

  const MarketListContent = data?.length && (
    <div className={classes["market-list"]}>
      {SortMenu}
      {NotFoundContent}
      {ErrorContent}
      {CurrenciesContent}
    </div>
  );
  const PaginationContent = !isError && !isLoading && (
    <PaginationBar
      isLoading={isLoading}
      disabled={isPreviousData || !data}
      page={page}
      changePage={changePage}
    />
  );
  return (
    <>
      {LoadingContent}
      {MarketListContent}
      {PaginationContent}
    </>
  );
};
