import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrenciesData } from "../../store/currencies-actions";
import { currenciesActions } from "../../store/currencies-slice";
import { CurrenciesSortMenu } from "./CurrenciesSortMenu";
import { CoinCard } from "../cards/coinCard/CoinCard";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import Notification from "../ui/Notification";
import classes from "./CurrenciesList.module.scss";
import { useRouter } from "next/router";
//types
import { RootState } from "../../store/store";
import { AppDispatch } from "../../store/store";
import { PagesNav } from "./PagesNav";

const SECOND_TO_REFRESH = 25;
const TIME_TO_REFRESH_DATA = SECOND_TO_REFRESH * 1000;

export const CurrenciesList = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { notification, isLoading } = useSelector(
    (state: RootState) => state.uiSlice
  );
  const {
    sortActive,
    items: currenciesItems,
    visibleItems,
  } = useSelector((state: RootState) => state.currencies);

  useEffect(() => {
    dispatch(
      currenciesActions.setVisibleItems({
        items: currenciesItems,
        page: router.asPath,
      })
    );
  }, [currenciesItems, router.asPath]);

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

  if (isLoading) return <LoadingSpinner />;
  if (notification.message !== "") {
    return <Notification message={notification.message} />;
  }
  return (
    <>
      <div className={classes["market-list"]}>
        {!visibleItems.length && <p className="center">Not found items.</p>}
        {visibleItems.length !== 0 && <CurrenciesSortMenu page={"home"} />}
        {visibleItems.map((item) => {
          return <CoinCard key={item.id} item={item} />;
        })}
      </div>
      {visibleItems.length !== 0 && <PagesNav />}
    </>
  );
};
