import { useDispatch, useSelector } from "react-redux";
import { convertActions } from "@/store/converter/convert-slice";
import classes from "../convertItem/ConvertItem.module.scss";
import { FormEvent } from "react";
//types
import { AppDispatch } from "@/store/store";
import { RootState } from "@/store/store";

export const ConvertAmount = () => {
  const amount = useSelector((state: RootState) => state.convert.quantity);
  const dispatch = useDispatch<AppDispatch>();

  const inputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (+value < 0 || +value.length >= 21) {
      dispatch(convertActions.setWarning(true));
      return;
    }
    dispatch(convertActions.setWarning(false));
    dispatch(convertActions.changeQuantity(value));
  };

  return (
    <div className={classes.box}>
      <div className={classes.selects}>
        <label htmlFor="amount">Amount:</label>
        <input
          name="amount"
          id="amount"
          type="number"
          value={amount}
          onChange={inputChangeHandler}
          className={classes.amount}
        />
      </div>
    </div>
  );
};
