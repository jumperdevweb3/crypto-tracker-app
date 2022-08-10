import { ConvertItem } from "./ConvertItem";
import { BiTransfer } from "react-icons/bi";
import classes from "./Converter.module.scss";
import { useState } from "react";
import { ConvertAmount } from "./ConvertAmount";
import { ConvertedValueDisplay } from "./ConvertedValueDisplay";

export const ConvertTools = () => {
  const [currencyInputData, setCurrencyInputData] = useState({from: 'Cos',to: 'cos innego'});

  const swapCurrenciesHandler = () => {
    setCurrencyInputData(oldData => {return {from: oldData.to, to: oldData.from}})
  };

  const selectCurrencyHandler = (kind) => {
    dispatch(
      convertActions.setValue({
        kind: props.kind,
        item: { id, price: item.current_price.toFixed(2), name: item.name },
      })
    );
  }

  const selectCurrencyNameFromHandler = () => {
    
  }

  const selectCurrencyNameToHandler = () => {

  }

  useEffect(() => {
    //fetchowanie i inne
  },[currencyInputData])

  return (
    <div className={classes["inputs-box"]}>
      <ConvertAmount/>
      <ConvertItem kind="from" onSelectCurrency={selectCurrencyNameFromHandler} />
      <div className={classes["convert-type"]}>
        <button onClick={swapCurrenciesHandler}>
          <BiTransfer fontSize="2rem" color="rgb(193, 162, 222)" />
        </button>
      </div>
      <ConvertItem kind="to" onSelectCurrency={selectCurrencyNameToHandler} />
      <ConvertedValueDisplay to={currencyInputData.to} from={currencyInputData.from} amount={}/>
    </div>
  );
};
