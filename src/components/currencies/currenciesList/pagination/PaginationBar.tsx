import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import { currenciesActions } from "../../../../store/currencies/currencies-slice";
import { Pagination } from "@mantine/core";
import classes from "../CurrenciesList.module.scss";

export const PaginationBar = ({ isLoading }: { isLoading: boolean }) => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof router.query.page === "string") {
      const pagee = +router.query.page || page;
      setPage(pagee);
    }
    if (router.asPath === "/") {
      setPage(1);
    }
  }, [router]);

  const { visibleItems, test } = useSelector(
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
      disabled={isLoading}
    />
  );
  return <>{PaginationBar}</>;
};
