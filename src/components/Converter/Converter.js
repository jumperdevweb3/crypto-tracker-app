import { fetchCurrenciesData } from "../../Store/currencies-actions";
import classes from "./Converter.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const Converter = () => {
  const currenciesData = useSelector((state) => state.currencies.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currenciesData.length === 0) {
      dispatch(fetchCurrenciesData());
    }
  }, [dispatch]);

  const inputItems = currenciesData.map((item) => (
    <option value={item.id} key={Math.random() * 100}>
      {item.name} - {item.symbol.toUpperCase()}
    </option>
  ));
  return (
    <div className={classes.container}>
      <div className={classes["inputs-box"]}>
        <div className={classes.box}>
          <div className={classes.selects}>
            <input name="currency" id="currency" placeholder="price" />

            <select name="currency" id="currency">
              <optgroup label="Fiat">
                <option value="usd">USD</option>
                <option value="pln">PLN</option>
              </optgroup>
              <optgroup label="Cryptocurrencies">{inputItems}</optgroup>
            </select>
          </div>
        </div>
        <div className={classes["convert-type"]}>
          {/* <FaArrowLeft fontSize="3rem" color="rgb(193, 162, 222)" /> */}
          <button>
            {" "}
            <FaArrowRight fontSize="3rem" color="rgb(193, 162, 222)" />
          </button>
        </div>
        <div className={classes.box}>
          <div className={classes.selects}>
            <input
              name="currency"
              id="currency"
              placeholder="price"
              disabled={true}
            />
            <select name="currency" id="currency">
              <optgroup label="Fiat">
                <option value="usd">USD</option>
                <option value="pln">PLN</option>
              </optgroup>
              <optgroup label="Cryptocurrencies">{inputItems}</optgroup>
            </select>
          </div>
        </div>
      </div>
      <div className={classes.result}>
        <p>Result</p>
      </div>
    </div>
  );
};
