import classes from "./Tracker.module.scss";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { fetchEtherScanData } from "../../store/currencies-actions";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { RootState } from "../../store";

export const Tracker = () => {
  const fetchResult = useSelector((state: RootState) => state.scanner.result);
  const fetchErrorMessage = useSelector(
    (state: RootState) => state.scanner.errorMessage
  );
  const isLoading = useSelector((state: RootState) => state.scanner.isLoading);
  const [inputValue, setInputValue] = useState("");
  const dispatch: any = useDispatch();

  const inputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };
  const fetchDataHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue || inputValue.length < 18) return;
    dispatch(fetchEtherScanData(inputValue));
    setInputValue("");
  };

  const result = fetchErrorMessage ? 0 : fetchResult * Math.pow(10, -18);
  return (
    <div className={classes.container}>
      <form className={classes.box} onSubmit={fetchDataHandler}>
        <input
          className={classes["input-search"]}
          type="search"
          placeholder="Search by wallet address to show ether balance..."
          value={inputValue}
          onChange={inputChangeHandler}
        />
        <button type="submit">
          <FaSearch fontSize="1.5rem" color="rgb(193, 162, 222)" />
        </button>
      </form>
      {isLoading && <LoadingSpinner />}
      <div className={classes.result}>
        <p>
          Entered Wallet have a{" "}
          <span className={classes.amount}>
            {result ? result.toFixed(10) : 0}{" "}
          </span>
          ETH
        </p>
      </div>
      <p className={classes.error}>{fetchErrorMessage && fetchErrorMessage}</p>
      <p className={classes.description}>
        *You can use test wallet address -
        0x0D992fF8cd5c417Ce6c935A6d36e027f91119Ccf
      </p>
    </div>
  );
};
