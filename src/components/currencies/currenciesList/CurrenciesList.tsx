import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currenciesActions } from "../../../store/currencies/currencies-slice";
import { CurrenciesSortMenu } from "./currenciesSortMenu/CurrenciesSortMenu";
import CoinCard from "../../cards/coinCard/CoinCard";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import Notification from "../../ui/notification/Notification";
import classes from "./CurrenciesList.module.scss";
import { useRouter } from "next/router";
import { PagesNav } from "./PagesNav";
//types
import { RootState } from "../../../store/store";
import { AppDispatch } from "../../../store/store";

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
      })
    );
  }, [currenciesItems, router.asPath]);

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
      {/* {visibleItems.length !== 0 && <PagesNav />} */}
    </>
  );
};
