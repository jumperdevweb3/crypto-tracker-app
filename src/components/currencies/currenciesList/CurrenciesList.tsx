import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currenciesActions } from "../../../store/currencies/currencies-slice";
import { CurrenciesSortMenu } from "./currenciesSortMenu/CurrenciesSortMenu";
import CoinCard from "../../cards/coinCard/CoinCard";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import Notification from "../../ui/notification/Notification";
import classes from "./CurrenciesList.module.scss";
import { useRouter } from "next/router";
//types
import { RootState } from "../../../store/store";
import { AppDispatch } from "../../../store/store";
import { Pagination } from "@mantine/core";

export const CurrenciesList = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (typeof router.query.page === "string") {
      const pagee = +router.query.page || page;
      setPage(pagee);
    }
    if (router.asPath === "/") {
      setPage(1);
    }
  }, [router]);

  const dispatch = useDispatch<AppDispatch>();
  const { notification, isLoading } = useSelector(
    (state: RootState) => state.uiSlice
  );
  const { sortActive, visibleItems, test } = useSelector(
    (state: RootState) => state.currencies
  );

  useEffect(() => {
    if (test[page]) {
      dispatch(
        currenciesActions.setVisibleItems({
          items: test[page],
        })
      );
    }
  }, [test, page]);

  useEffect(() => {
    dispatch(currenciesActions.sortData());
  }, [dispatch, sortActive]);

  if (isLoading) return <LoadingSpinner />;
  if (notification.message !== "") {
    return <Notification message={notification.message} />;
  }
  const ItemsRender = visibleItems.map((item) => {
    return <CoinCard key={item.id} item={item} />;
  });
  const CurrenciesContent = (
    <>
      {visibleItems.length !== 0 && <CurrenciesSortMenu page={"home"} />}
      {ItemsRender}
    </>
  );
  const NotFoundContent = !visibleItems.length && (
    <p className="center">Not found items.</p>
  );

  const changePage = (event: number) => {
    setPage(event);
    router.push(`/?page=${event}`, undefined, { scroll: false });
  };
  const PaginationBar = visibleItems.length && (
    <Pagination
      total={10}
      className={classes.pagination}
      page={page}
      onChange={changePage}
    />
  );

  return (
    <>
      <div className={classes["market-list"]}>
        {NotFoundContent}
        {CurrenciesContent}
      </div>
      {PaginationBar}
    </>
  );
};
