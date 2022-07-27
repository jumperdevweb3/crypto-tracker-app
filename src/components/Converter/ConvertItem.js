import { convertActions } from "../../Store/convert-slice";
import classes from "./Converter.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export const ConvertItem = (props) => {
  const [showPrice, setShowPrice] = useState(0);
  const [selval, setSelVal] = useState();
  const currenciesData = useSelector((state) => state.currencies.items);
  const convertLeftState = useSelector((state) => state.convert.leftSide);
  const convertRightState = useSelector((state) => state.convert.rightSide);
  const stateChanges = useSelector((state) => state.convert);
  const dispatch = useDispatch();

  const inputItems = currenciesData.map((item) => (
    <option value={item.id} key={Math.random() * 100}>
      {item.name} - {item.symbol.toUpperCase()}
    </option>
  ));

  const selectHandler = (event) => {
    setSelVal(event.target.value);
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
    dispatch(
      convertActions.setMultiplier({
        kind: props.kind,
        value: event.target.value,
      })
    );
  };
  useEffect(() => {
    if (convertLeftState.price !== 0 && convertRightState.price !== 0) {
      dispatch(convertActions.convertData());
    }
  }, [stateChanges]);
  return (
    <div className={classes.box}>
      <div className={classes.selects}>
        <input
          name="currency"
          id="currency"
          placeholder="0"
          onChange={updateValue}
        />

        <select
          name="currency"
          id="currency"
          onChange={selectHandler}
          value={selval}
        >
          <optgroup label="Fiat">
            <option id="usd">USD</option>
            <option id="pln">PLN</option>
          </optgroup>
          <optgroup label="Cryptocurrencies">{inputItems}</optgroup>
        </select>
      </div>
      <div className={classes.pricebox}>
        <p className={classes.price}>{showPrice !== 0 && showPrice}</p>
      </div>
    </div>
  );
};
