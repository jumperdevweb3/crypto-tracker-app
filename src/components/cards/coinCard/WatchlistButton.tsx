import { useSelector } from "react-redux";
import { BiStar } from "react-icons/bi";
import { FcApproval } from "react-icons/fc";
import { RootState } from "../../../store";

export const WatchlistButton = ({
  classes,
  onClick,
  id,
}: {
  classes: any;
  onClick: () => void;
  id: string;
}) => {
  const watchList = useSelector(
    (state: RootState) => state.watchlist.watchItems
  );

  const isItemWatch = watchList.find((watchItem: { id: string }) => {
    return watchItem.id === id;
  });

  let isWatchIcon = <BiStar color="#8d9904" fontSize="1.25rem" />;
  if (isItemWatch) {
    isWatchIcon = <FcApproval fontSize="1.25rem" />;
  }
  return (
    <button className={classes.star} onClick={onClick}>
      {isWatchIcon}
    </button>
  );
};
