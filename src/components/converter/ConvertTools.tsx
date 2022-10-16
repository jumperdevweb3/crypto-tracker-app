import { ConvertItem } from "./ConvertItem";
import classes from "./Converter.module.scss";
import { ConvertAmount } from "./ConvertAmount";
import { ConverSwapper } from "./ConverSwapper";
export const ConvertTools = () => {
  return (
    <div className={classes["inputs-box"]}>
      <ConvertAmount />
      <ConvertItem kind="from" />
      <ConverSwapper />
      <ConvertItem kind="to" />
    </div>
  );
};
