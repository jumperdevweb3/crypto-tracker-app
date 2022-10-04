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
import Link from "next/link";

const SECOND_TO_REFRESH = 40;
const TIME_TO_REFRESH_DATA = SECOND_TO_REFRESH * 1000;
const pagesPaths = [
  { page: "1" },
  { page: "2" },
  { page: "3" },
  { page: "4" },
  { page: "5" },
];
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (notification.message !== "") {
    return <Notification message={notification.message} />;
  }

  const activePageStyle = `${classes.link} ${classes.active}`;

  return (
    <>
      <div className={classes["market-list"]}>
        {!visibleItems.length && <p className="center">Not found items.</p>}
        {visibleItems.length !== 0 && <CurrenciesSortMenu page={"home"} />}
        {visibleItems.map((item) => {
          return <CoinCard key={item.id} item={item} />;
        })}
      </div>
      {visibleItems.length !== 0 && (
        <div className={classes.pages}>
          {pagesPaths.map((item) => (
            <Link
              key={item.page}
              href={{
                pathname: "/",
                query: { page: item.page },
              }}
              scroll={false}
            >
              <a
                className={
                  router.asPath === `/?page=${item.page}`
                    ? activePageStyle
                    : router.asPath === "/"
                    ? classes["home-page"]
                    : classes.link
                }
              >
                {item.page}
              </a>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
