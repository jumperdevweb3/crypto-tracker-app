import { useSelector } from "react-redux";
import classes from "./Converter.module.scss";

export const ConvertedValueDisplay = () => {
  const interNumberFormat = new Intl.NumberFormat("en-US");

  const warning = useSelector((state) => state.convert.warning);
  const itemFromData = useSelector((state) => state.convert.itemFrom);
  const itemToData = useSelector((state) => state.convert.itemTo);
  const amount = useSelector((state) => state.convert.quantity);
  const result = useSelector((state) => state.convert.result);

  const resultView =
    itemFromData.price && itemToData.price && amount !== 0
      ? `${interNumberFormat.format(amount)} 
          ${itemFromData.name} =
          ${interNumberFormat.format(result)} 
          ${itemToData.name}`
      : "Please Select Data";

  return (
    <div className={classes.result}>
      <p>Converted Amount:</p>
      <p className={classes["result-number"]}>{resultView}</p>
    </div>
  );
};
