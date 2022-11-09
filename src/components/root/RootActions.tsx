import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { watchlistActions } from "../../store/watchlist/watchlist-slice";
import { PropsChildren } from "../../types/types";
import { TIME_TO_REFRESH_DATA } from "./fetchSettings";

export const RootActions = ({ children }: PropsChildren) => {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) => state.watchlist.watchItems);

  useEffect(() => {
    const local = localStorage.getItem("watchlist");
    if (local !== null) {
      dispatch(watchlistActions.setItem(JSON.parse(local)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(data));
  }, [data]);

  // useEffect(() => {
  //   const refreshData = setInterval(() => {
  //     dispatch(fetchCurrenciesData(false, key));
  //   }, TIME_TO_REFRESH_DATA);

  //   return () => {
  //     clearInterval(refreshData);
  //   };
  // }, [dispatch]);
  return <>{children}</>;
};
