import { convertActions } from "../../Store/convert-slice";
import classes from "./ConvertItem.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export const ConvertItem = (props) => {
  const [showPrice, setShowPrice] = useState(0);
  const [nameInputValue, setNameInputValue] = useState();
  const currenciesData = useSelector((state) => state.currencies.items);
  const leftVal = useSelector((state) => state.convert.leftValue);
  const rightVal = useSelector((state) => state.convert.rightValue);
  const stateChanges = useSelector((state) => state.convert);

  const dispatch = useDispatch();

  const inputItems = currenciesData.map((item) => (
    <option value={item.id} key={Math.random() * 100}>
      {item.name} - {item.symbol.toUpperCase()}
    </option>
  ));

  const selectHandler = (event) => {
    setNameInputValue(event.target.value);
    const id = event.target.value;
    const item = currenciesData.filter((item) => item.id === id);
    const price = item[0].current_price;
    setShowPrice(price);
    dispatch(
      convertActions.setValue({
        kind: props.kind,
        item: { id, price: price.toFixed(2), name: item[0].name },
      })
    );
  };
  const updateValue = (event) => {
    if (event.target.value <= 1_000_000) {
      dispatch(convertActions.setWarning(false));

      dispatch(
        convertActions.setMultiplier({
          kind: props.kind,
          value: event.target.value,
        })
      );
    } else {
      dispatch(convertActions.setWarning(true));
    }
  };
  useEffect(() => {
    dispatch(convertActions.convertData());
  }, [stateChanges]);
  return (
    <div className={classes.box}>
      <div className={classes.selects}>
        <input
          type="number"
          name="currency"
          id="currency"
          placeholder="0"
          max="10"
          value={props.kind === "left" ? leftVal : rightVal}
          onChange={updateValue}
        />

        <div className={classes["select-box"]}>
          <select
            name="currency"
            id="currency"
            onChange={selectHandler}
            value={nameInputValue}
          >
            <optgroup label="Fiat">
              <option id="usd">USD</option>
              <option id="pln">PLN</option>
            </optgroup>
            <optgroup label="Cryptocurrencies">{inputItems}</optgroup>
          </select>
          <p className={classes.price}>{showPrice && showPrice}</p>
        </div>
      </div>
    </div>
  );
};
