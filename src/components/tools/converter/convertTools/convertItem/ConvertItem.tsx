import { useSelector, useDispatch } from "react-redux";
import { FormEvent, useEffect } from "react";
import { convertActions } from "@/store/converter/convert-slice";
import classes from "../convertItem/ConvertItem.module.scss";
import { getPrices } from "./fetchPrices";
import { useQuery } from "react-query";
//types
import { AppDispatch } from "@/store/store";
import { RootState } from "@/store/store";
import { ICurrencyItem } from "@/types/types";

export const ConvertItem = ({ kind }: { kind: string }) => {
  const {
    data: currenciesData,
    isError,
    status,
  } = useQuery<ICurrencyItem[]>("convertItems", getPrices, {
    refetchOnWindowFocus: false,
    refetchInterval: 35000,
    keepPreviousData: true,
  });
  const dispatch = useDispatch<AppDispatch>();

  const { itemFrom, itemTo, quantity } = useSelector(
    (state: RootState) => state.convert
  );

  const nameInputValue = kind === "from" ? itemFrom.id : itemTo.id;
  const wasSelected = itemFrom.id !== "" && itemTo.id !== "";

  const OptionItems =
    status === "success" &&
    currenciesData.map((item) => (
      <option value={item.id} key={Math.random() * 100}>
        {item.name}
      </option>
    ));

  const selectHandler = (event: FormEvent<HTMLSelectElement>) => {
    const id = event.currentTarget.value;
    dispatch(convertActions.onOptionChange({ kind: kind, id }));
    const item =
      status === "success" && currenciesData.find((item) => item.id === id);

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

  const firstView = !wasSelected;
  const selectContent = firstView && (
    <option className={classes.option} value="">
      Please select currency
    </option>
  );
  const errorContent = isError && <option value={0}>Data load problem</option>;
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
            {selectContent}
            {currenciesData && OptionItems}
            {errorContent}
          </optgroup>
        </select>
      </div>
    </div>
  );
};
