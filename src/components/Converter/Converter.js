import classes from "./Converter.module.scss";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ConvertItem } from "./ConvertItem";

export const Converter = () => {
  const result = useSelector((state) => state.convert.result);
  const resultName = useSelector((state) => state.convert.rightSide.name);
  const interNumberFormat = new Intl.NumberFormat("en-US");
  return (
    <div className={classes.container}>
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
          You will get{" "}
          <span className={classes["result-number"]}>
            {result ? interNumberFormat.format(result) : "result"}
          </span>{" "}
          {resultName}
        </p>
      </div>
    </div>
  );
};
