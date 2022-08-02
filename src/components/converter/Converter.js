import classes from "./Converter.module.scss";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ConvertItem } from "./ConvertItem";

export const Converter = () => {
  const result = useSelector((state) => state.convert.result);
  const resultName = useSelector((state) => state.convert.rightSide.name);
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
        <ConvertItem kind="left" />
        <div className={classes["convert-type"]}>
          <button>
            <FaArrowRight fontSize="3rem" color="rgb(193, 162, 222)" />
          </button>
        </div>
        <ConvertItem kind="right" />
      </div>
      <div className={classes.result}>
        <p>
          {!warning ? "Convert result is" : "Ops"}{" "}
          <span className={classes["result-number"]}>
            {warning && "Incorrect value!"}
            {!warning &&
              (result ? interNumberFormat.format(result) : "select data")}
          </span>{" "}
          {!warning && resultName}
        </p>
      </div>
    </div>
  );
};
