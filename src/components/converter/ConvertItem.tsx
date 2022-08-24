import { useSelector, useDispatch } from "react-redux";
import { FormEvent, useEffect } from "react";
import { convertActions } from "../../store/convert-slice";
import classes from "./ConvertItem.module.scss";
import { RootState } from "../../store";

export const ConvertItem = ({ kind }: { kind: string }) => {
  const nameInputValue = useSelector((state: RootState) =>
    kind === "from" ? state.convert.itemFrom.id : state.convert.itemTo.id
  );
  const currenciesData = useSelector(
    (state: RootState) => state.currencies.items
  );
  const quantity = useSelector((state: RootState) => state.convert.quantity);
  const convertState = useSelector((state: RootState) => state.convert);
  const wasSelected =
    convertState.itemFrom.id !== "" && convertState.itemTo.id !== "";
  const dispatch = useDispatch();

  const optionItems = currenciesData.map((item) => (
    <option value={item.id} key={Math.random() * 100}>
      {item.name}
    </option>
  ));

  const selectHandler = (event: FormEvent<HTMLSelectElement>) => {
    const id = event.currentTarget.value;
    dispatch(convertActions.onOptionChange({ kind: kind, id }));
    const item = currenciesData.find((item) => item.id === id);

    if (!item) return;

    dispatch(
      convertActions.setValue({
        kind: kind,
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
        <label htmlFor="currency">{kind === "from" ? "From:" : "To:"}</label>
        <select
          name="currency"
          id="currency"
          onChange={selectHandler}
          value={nameInputValue}
        >
          <optgroup label="Cryptocurrencies">
            {!wasSelected && <option value="">Please select currency</option>}
            {optionItems}
          </optgroup>
        </select>
      </div>
    </div>
  );
};
