import { convertActions } from "../../store/convert-slice";
import classes from "./ConvertItem.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export const ConvertItem = (props) => {
  const [nameInputValue, setNameInputValue] = useState();
  const currenciesData = useSelector((state) => state.currencies.items);
  const valueFrom = useSelector((state) => state.convert.quantityFrom);
  const valueTo = useSelector((state) => state.convert.quantityTo);
  const convertState = useSelector((state) => state.convert);

  const dispatch = useDispatch();

  const optionItems = currenciesData.map((item) => (
    <option value={item.id} key={Math.random() * 100}>
      {item.name} - {item.symbol.toUpperCase()}
    </option>
  ));

  const selectHandler = (event) => {
    setNameInputValue(event.target.value);
    console.log(event.target.value);
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
  const updateValue = (event) => {
    if (event.target.value <= 10_000_000 && event.target.value >= 0) {
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
    if (true) {
      console.log("robie cos");
      dispatch(convertActions.convertData(props.kind));
    }
  }, [convertState]);

  return (
    <div className={classes.box}>
      <div className={classes.selects}>
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

        <input
          type="number"
          name="currency"
          id="currency"
          placeholder="0"
          max="10"
          value={props.kind === "from" ? valueFrom : valueTo}
          onChange={updateValue}
        />
      </div>
    </div>
  );
};
