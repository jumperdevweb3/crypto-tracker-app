import { useSelector } from "react-redux";
import classes from "./Converter.module.scss";
import { RootState } from "../../store";
export const ConvertedValueDisplay = () => {
  const interNumberFormat = new Intl.NumberFormat("en-US");

  const warning = useSelector((state: RootState) => state.convert.warning);
  const itemFromData = useSelector(
    (state: RootState) => state.convert.itemFrom
  );
  const itemToData = useSelector((state: RootState) => state.convert.itemTo);
  const amount = useSelector((state: RootState) => state.convert.quantity);
  const result = useSelector((state: RootState) => state.convert.result);

  const resultView =
    itemFromData.price && itemToData.price && amount !== 0
      ? `${interNumberFormat.format(amount)} 
          ${itemFromData.name} =
          ${interNumberFormat.format(result)} 
          ${itemToData.name}`
      : "Please Select Data";

  return (
    <div className={classes.result}>
      <p>Converted Result:</p>
      <p className={classes["result-number"]}>
        {warning ? "Incorrect value!" : resultView}
      </p>
      {warning && (
        <p className={classes["result-warning"]}>
          {` * Max length amount = 8 and Number can't be < 0.`}
        </p>
      )}
    </div>
  );
};
