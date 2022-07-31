import { useSelector } from "react-redux";
import { BiStar } from "react-icons/bi";
import { FcApproval } from "react-icons/fc";

export const WatchlistButton = ({ classes, onClick, id }) => {
  const watchList = useSelector((state) => state.watchlist.watchItems);

  const isItemWatch = watchList.find((watchItem) => {
    return watchItem.id === id;
  });

  let isWatchIcon = <BiStar color="#8d9904" fontSize="1.1rem" />;
  if (isItemWatch) {
    isWatchIcon = <FcApproval fontSize="1.1rem" />;
  }
  return (
    <button className={classes.star} onClick={onClick}>
      {isWatchIcon}
    </button>
  );
};
