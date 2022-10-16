import { BiTransfer } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { convertActions } from "../../store/convert-slice";
import { AppDispatch } from "../../store/store";
import classes from "./Converter.module.scss";

export const ConverSwapper = () => {
  const dispatch = useDispatch<AppDispatch>();

  const swapCurrenciesHandler = () => {
    dispatch(convertActions.swap());
  };
  return (
    <div className={classes["convert-type"]}>
      <button onClick={swapCurrenciesHandler}>
        <BiTransfer fontSize="2rem" color="rgb(193, 162, 222)" />
      </button>
    </div>
  );
};
