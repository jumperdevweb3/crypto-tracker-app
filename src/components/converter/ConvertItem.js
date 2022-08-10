import { convertActions } from "../../store/convert-slice";
import classes from "./ConvertItem.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export const ConvertItem = (props) => {
  const [nameInputValue, setNameInputValue] = useState();
  const currenciesData = useSelector((state) => state.currencies.items);
  const quantity = useSelector((state) => state.convert.quantity);
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

    dispatch(
      convertActions.setValue({
        kind: props.kind,
        item: { id, price: item.current_price.toFixed(2), name: item.name },
      })
    );
  };

  useEffect(() => {
    if (
      quantity !== 0 &&
      convertState.itemFrom.price &&
      convertState.itemTo.price
    ) {
      dispatch(convertActions.convertData());
    }
  }, [quantity, convertState.itemFrom, convertState.itemTo]);

  const quantityChangeHandler = (event) => {
    const value = event.target.value;
    dispatch(convertActions.changeQuantity(+value));
  };

  return (
    <div className={classes.box}>
        <div className={classes.selects}>
          <label htmlFor="currency">{props.kind === 'to' ? 'To:':'From:'}</label>
          <select
            name="currency"
            id="currency"
            onChange={selectHandler}
            value={nameInputValue}
          >
            <optgroup label="Cryptocurrencies">
              <option></option>
              {optionItems}
            </optgroup>
          </select>
        </div>
    </div>
  );
};
