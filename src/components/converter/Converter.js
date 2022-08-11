import classes from "./Converter.module.scss";
import { useSelector } from "react-redux";
import { ConvertTools } from "./ConvertTools";
import { ConvertedValueDisplay } from "./ConvertedValueDisplay";

export const Converter = () => {
  const warning = useSelector((state) => state.convert.warning);

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <p>
          You can convert selected
          <span className={classes["sub-title"]}> currencies.</span>{" "}
        </p>
      </div>
      <ConvertTools />
      <ConvertedValueDisplay />
    </div>
  );
};
