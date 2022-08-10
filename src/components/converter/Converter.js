import classes from "./Converter.module.scss";
import { BiTransfer } from "react-icons/bi";
import { useSelector } from "react-redux";
import { ConvertItem } from "./ConvertItem";

export const Converter = () => {
  const result = useSelector((state) => state.convert.result);
  const resultName = useSelector((state) => state.convert.priceTo.name);
  const interNumberFormat = new Intl.NumberFormat("en-US");
  const warning = useSelector((state) => state.convert.warning);

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <p>
          You can convert selected
          <span className={classes["sub-title"]}> currencies.</span>{" "}
        </p>
      </div>
      <div className={classes["inputs-box"]}>
        <ConvertItem kind="from" />
        <div className={classes["convert-type"]}>
          <button>
            <BiTransfer fontSize="2rem" color="rgb(193, 162, 222)" />
          </button>
        </div>
        <ConvertItem kind="to" />
      </div>
      {warning && (
        <div className={classes.result}>
          <p>
            Ops
            <span className={classes["result-number"]}> Incorrect value!</span>
          </p>
        </div>
      )}
    </div>
  );
};
