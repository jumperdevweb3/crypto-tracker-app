import { MainNav } from "./MainNav";
import classes from "./Layout.module.scss";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCurrenciesData } from "../../store/currencies-actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { watchlistActions } from "../../store/watchlist-slice";
import { PropsChildren } from "../../types/types";

export const Layout = ({ children }: PropsChildren) => {
  const dispatch = useDispatch<AppDispatch>();
  const currenciesData = useSelector(
    (state: RootState) => state.currencies.items
  );
  const data = useSelector((state: RootState) => state.watchlist.watchItems);

  useEffect(() => {
    if (currenciesData.length === 0) {
      dispatch(fetchCurrenciesData(false));
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
    <>
      <MainNav />
      <main className={classes.main}>{children}</main>
    </>
  );
};
