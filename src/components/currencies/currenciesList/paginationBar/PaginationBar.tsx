import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import { currenciesActions } from "../../../../store/currencies/currencies-slice";
import { Pagination } from "@mantine/core";
import classes from "./PaginationBar.module.scss";

interface Props {
  isLoading: boolean;
  disabled: boolean;
  page: number | string;
}

export const PaginationBar = ({ isLoading, disabled, page }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const changePage = (event: number) => {
    router.push(`/?page=${event}`, undefined, { scroll: false, shallow: true });
  };
  const PaginationBar = (
    <Pagination
      total={10}
      className={classes.pagination}
      page={+page}
      onChange={changePage}
      disabled={isLoading || disabled}
    />
  );
  return <>{PaginationBar}</>;
};
