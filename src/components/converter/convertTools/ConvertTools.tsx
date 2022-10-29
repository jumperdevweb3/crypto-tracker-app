import { ConvertItem } from "./convertItem/ConvertItem";
import classes from "../Converter.module.scss";
import { ConvertAmount } from "./convertAmount/ConvertAmount";
import { ConverSwapper } from "./convertSwapper/ConverSwapper";
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
