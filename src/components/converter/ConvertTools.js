import { ConvertItem } from "./ConvertItem";
import { BiTransfer } from "react-icons/bi";
import classes from "./Converter.module.scss";
import { useState } from "react";

export const ConvertTools = () => {
  const [reverse, setReverse] = useState(false);
  const reverseHandler = () => {
    setReverse((state) => !state);
  };

  return (
    <div className={classes["inputs-box"]}>
      <ConvertItem kind="amount" />
      <ConvertItem kind="from" />
      <div className={classes["convert-type"]}>
        <button onClick={reverseHandler}>
          <BiTransfer fontSize="2rem" color="rgb(193, 162, 222)" />
        </button>
      </div>
      <ConvertItem kind="to" />
    </div>
  );
};
