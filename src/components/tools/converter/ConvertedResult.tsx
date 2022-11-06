import { useSelector } from "react-redux";
import classes from "./Converter.module.scss";
import { RootState } from "../../../store/store";
export const ConvertedResult = () => {
  const interNumberFormat = new Intl.NumberFormat("en-US");
  const {
    result,
    quantity: amount,
    itemTo: itemToData,
    itemFrom: itemFromData,
    warning,
  } = useSelector((state: RootState) => state.convert);

  const resultView =
    itemFromData.price && itemToData.price && amount !== 0
      ? `${interNumberFormat.format(amount)} 
          ${itemFromData.name} =
          ${interNumberFormat.format(result)} 
          ${itemToData.name}`
      : "Please Select Data";
  const ResultContent = warning ? "Incorrect value!" : resultView;
  const WarningContent = warning && (
    <p className={classes["result-warning"]}>
      {` * Max length amount = 21 and Number can't be < 0.`}
    </p>
  );
  return (
    <div className={classes.result}>
      <p>Converted Result:</p>
      <p className={classes["result-number"]}>{ResultContent}</p>
      {WarningContent}
    </div>
  );
};
