import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrenciesData } from "../../store/currencies-actions";
import { currenciesActions } from "../../store/currencies-slice";
import { CurrenciesOptions } from "./CurrenciesOptions";
import { CoinCard } from "../cards/coinCard/CoinCard";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import Notification from "../ui/Notification";
import classes from "./CurrenciesList.module.scss";
//types
import { RootState } from "../../store/store";
import { AppDispatch } from "../../store/store";

const SECOND_TO_REFRESH = 15;
const TIME_TO_REFRESH_DATA = SECOND_TO_REFRESH * 1000;

export const CurrenciesList = () => {
  const { notification, isLoading } = useSelector(
    (state: RootState) => state.uiSlice
  );
  const { sortActive, items: currenciesItems } = useSelector(
    (state: RootState) => state.currencies
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const refreshData = setInterval(() => {
      dispatch(fetchCurrenciesData(false));
    }, TIME_TO_REFRESH_DATA);

    return () => {
      clearInterval(refreshData);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(currenciesActions.sortData());
  }, [dispatch, sortActive]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (notification.message !== "") {
    return <Notification message={notification.message} />;
  }

  return (
    <div className={classes["market-list"]}>
      <CurrenciesOptions />
      {currenciesItems.map((item) => {
        return <CoinCard key={item.id} item={item} />;
      })}
    </div>
  );
};
