import { useDispatch, useSelector } from "react-redux";
import { BiStar } from "react-icons/bi";
import { AppDispatch, RootState } from "../../../store/store";
import { AiFillStar } from "react-icons/ai";
import { watchlistActions } from "../../../store/watchlist-slice";
import { CurrencyItem } from "../../../types/types";
export const WatchlistButton = ({
  classes,
  id,
  item,
}: {
  classes: any;
  id: string;
  item: CurrencyItem;
}) => {
  const watchList = useSelector(
    (state: RootState) => state.watchlist.watchItems
  );

  const isItemWatch = watchList.find((watchItem: { id: string }) => {
    return watchItem.id === id;
  });

  let isWatchIcon = <BiStar color="#8d9904" fontSize="1.25rem" />;
  if (isItemWatch) {
    isWatchIcon = <AiFillStar fontSize="1.25rem" fill="gold" />;
  }
  const dispatch = useDispatch<AppDispatch>();

  const addToWatchlistHandler = () => {
    dispatch(watchlistActions.updateItems(item));
  };
  return (
    <button className={classes.star} onClick={addToWatchlistHandler}>
      {isWatchIcon}
    </button>
  );
};
