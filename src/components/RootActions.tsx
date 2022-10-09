import { useEffect } from "react";
import { AppDispatch, RootState } from "../store/store";
import { fetchCurrenciesData } from "../store/currencies-actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { watchlistActions } from "../store/watchlist-slice";
import { PropsChildren } from "../types/types";

const SECOND_TO_REFRESH = 20;
const TIME_TO_REFRESH_DATA = SECOND_TO_REFRESH * 1000;

export const RootActions = ({ children }: PropsChildren) => {
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

  useEffect(() => {
    const refreshData = setInterval(() => {
      dispatch(fetchCurrenciesData(false));
    }, TIME_TO_REFRESH_DATA);

    return () => {
      clearInterval(refreshData);
    };
  }, [dispatch]);
  return <>{children}</>;
};
