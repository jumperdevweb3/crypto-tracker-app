import { ConvertItem } from "./ConvertItem";
import { BiTransfer } from "react-icons/bi";
import classes from "./Converter.module.scss";
import { ConvertAmount } from "./ConvertAmount";
import { useDispatch } from "react-redux";
import { convertActions } from "../../store/convert-slice";

export const ConvertTools = () => {
  const dispatch = useDispatch();

  const swapCurrenciesHandler = () => {
    dispatch(convertActions.swap());
  };

  return (
    <div className={classes["inputs-box"]}>
      <ConvertAmount />
      <ConvertItem kind="from" />
      <div className={classes["convert-type"]}>
        <button onClick={swapCurrenciesHandler}>
          <BiTransfer fontSize="2rem" color="rgb(193, 162, 222)" />
        </button>
      </div>
      <ConvertItem kind="to" />
    </div>
  );
};
