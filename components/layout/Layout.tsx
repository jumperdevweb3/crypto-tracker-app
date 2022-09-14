import { MainNav } from "./MainNav";
import classes from "./Layout.module.scss";
import { ReactNode } from "react";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { fetchCurrenciesData } from "../../store/currencies-actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

type Props = {
  children: ReactNode;
};
import { watchlistActions } from "../../store/watchlist-slice";

export const Layout = ({ children }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const currenciesData = useSelector(
    (state: RootState) => state.currencies.items
  );
  const data = useSelector((state: RootState) => state.watchlist.watchItems);

  useEffect(() => {
    if (currenciesData.length === 0) {
      dispatch(fetchCurrenciesData(false));
    }
  }, []);

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
