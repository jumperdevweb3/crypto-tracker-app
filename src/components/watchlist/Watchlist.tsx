//types
import { ICurrencyItem } from "@/types/types";
import { RootState } from "@/store/store";
//components
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useQuery } from "react-query";
import { changeDataVariables } from "../../utils/changeDataVariables";
import { LoadingSpinner } from "../ui/loadingSpinner/LoadingSpinner";
import { getWatchItems } from "./fetchWatchItems";
import { watchlistActions } from "@/store/watchlist/watchlist-slice";
import { useEffect } from "react";
import { WatchItemsList } from "./WatchItemsList";
import { sortCurrencies } from "src/utils/sortCurrencies";

export const Watchlist = () => {
  const dispatch = useDispatch();

  const watchIds = useSelector((state: RootState) => state.watchlist.watchIds);
  const watchItems = useSelector((state: RootState) => state.watchlist.items);
  const { sortActive } = useSelector((state: RootState) => state.watchlist);

  const idsToFetch = watchIds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const {
    data: items,
    isError,
    isLoading,
    status,
  } = useQuery<ICurrencyItem[]>(
    ["watchItems"],
    () => getWatchItems(idsToFetch),
    {
      keepPreviousData: true,
      enabled: watchIds.length > 0,
      refetchInterval: 35000,
    }
  );

  const fetchedItems =
    status === "success"
      ? sortCurrencies(
          items.map((i) => changeDataVariables(i) as ICurrencyItem),
          sortActive
        )
      : [];

  useEffect(() => {
    dispatch(watchlistActions.setItems(fetchedItems));
  }, [items]);

  useEffect(() => {
    dispatch(watchlistActions.sortData());
  }, [sortActive]);

  const WatchlistContent = !!watchItems.length && !isLoading && (
    <WatchItemsList items={watchItems} />
  );
  const noItemsContent = !watchItems.length && !isError && (
    <p className="center-item xl">
      No items, you can add coin from <Link href="/">Home Page</Link> to your
      watchlist.
    </p>
  );
  const errorContent = isError && (
    <p className="center-item xl">
      Problem with CoinGeco API - try again late.
    </p>
  );
  const LoadingContent = isLoading && <LoadingSpinner />;
  return (
    <>
      {WatchlistContent}
      {noItemsContent}
      {LoadingContent}
      {errorContent}
    </>
  );
};
