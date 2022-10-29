import { useSelector, useDispatch } from "react-redux";
import { FormEvent, useEffect } from "react";
import { convertActions } from "../../../../store/convert-slice";
import classes from "../convertItem/ConvertItem.module.scss";
//types
import { AppDispatch } from "../../../../store/store";
import { RootState } from "../../../../store/store";

export const ConvertItem = ({ kind }: { kind: string }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { itemFrom, itemTo, quantity } = useSelector(
    (state: RootState) => state.convert
  );
  const currenciesData = useSelector(
    (state: RootState) => state.currencies.items
  );
  const nameInputValue = kind === "from" ? itemFrom.id : itemTo.id;
  const wasSelected = itemFrom.id !== "" && itemTo.id !== "";

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
    if (quantity !== 0 && itemFrom.price && itemTo.price) {
      dispatch(convertActions.convertData());
    }
  }, [quantity, itemFrom, itemTo]);

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
            {!wasSelected && currenciesData.length !== 0 && (
              <option className={classes.option} value="">
                Please select currency
              </option>
            )}
            {currenciesData && optionItems}
            {currenciesData.length === 0 && (
              <option value={0}>{"Data load problem"}</option>
            )}
          </optgroup>
        </select>
      </div>
    </div>
  );
};
