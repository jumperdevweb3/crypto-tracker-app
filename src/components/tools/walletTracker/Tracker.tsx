import classes from "./Tracker.module.scss";
import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import { getWalletData } from "./fetchWallet";

export const Tracker = () => {
  const [result, setResult] = useState({
    amount: 0,
    error: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };
  const fetchDataHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!inputValue || inputValue.length < 18) {
      setInputValue("");
      setIsLoading(false);
    }
    const data = await getWalletData(inputValue);
    if (data.status === "0") {
      setResult({
        amount: 0,
        error: data.result,
      });
    }
    if (data.status === "1") {
      const dataFormat = data.result * Math.pow(10, -18);
      setResult({
        amount: dataFormat,
        error: "",
      });
    }
    setIsLoading(false);
    setInputValue("");
  };
  const LoadingContent = isLoading && <LoadingSpinner />;
  const ResultContent = result.amount ? (
    <p>
      Entered Wallet have a{" "}
      <span className={classes.amount}>{result.amount.toFixed(10)}</span> ETH
    </p>
  ) : (
    "Search to show wallet ETH balance."
  );
  const ErrorContent = result.error && (
    <p className={classes.error}>{result.error}</p>
  );
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
      {LoadingContent}
      <div className={classes.result}>{ResultContent}</div>
      {ErrorContent}
      <p className={classes.description}>
        *You can use test wallet address -
        0x0D992fF8cd5c417Ce6c935A6d36e027f91119Ccf
      </p>
    </div>
  );
};
