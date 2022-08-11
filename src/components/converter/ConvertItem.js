import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { convertActions } from "../../store/convert-slice";
import classes from "./ConvertItem.module.scss";

export const ConvertItem = (props) => {
  const nameInputValue = useSelector((state) =>
    props.kind === "from" ? state.convert.itemFrom.id : state.convert.itemTo.id
  );
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
    const id = event.target.value;
    dispatch(convertActions.onOptionChange({ kind: props.kind, id }));
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

  return (
    <div className={classes.box}>
      <div className={classes.selects}>
        <label htmlFor="currency">
          {props.kind === "from" ? "From:" : "To:"}
        </label>
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
