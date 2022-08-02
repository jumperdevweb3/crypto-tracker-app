import { convertActions } from "../../store/convert-slice";
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
  const convertState = useSelector((state) => state.convert);

  const dispatch = useDispatch();

  const optionItems = currenciesData.map((item) => (
    <option value={item.id} key={Math.random() * 100}>
      {item.name} - {item.symbol.toUpperCase()}
    </option>
  ));

  const selectHandler = (event) => {
    setNameInputValue(event.target.value);

    const id = event.target.value;
    const item = currenciesData.find((item) => item.id === id);

    if (!item) return;

    setShowPrice(item.current_price);

    dispatch(
      convertActions.setValue({
        kind: props.kind,
        item: { id, price: item.current_price.toFixed(2), name: item.name },
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
  }, [convertState]);

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
            <optgroup label="Cryptocurrencies">
              <option value=""></option>
              {optionItems}
            </optgroup>
          </select>
          <p className={classes.price}>
            {showPrice !== 0 ? `$${showPrice}` : "$0"}
          </p>
        </div>
      </div>
    </div>
  );
};
