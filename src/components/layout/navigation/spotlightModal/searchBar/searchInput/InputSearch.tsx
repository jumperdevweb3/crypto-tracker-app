import classes from "./InputSearch.module.scss";
import { BiSearch } from "react-icons/bi";

export const InputSearch = ({ ...props }) => {
  return (
    <div className={classes["input-box"]}>
      <BiSearch className={classes.search} fontSize={"1.2rem"} color={"#aaa"} />
      <input
        type="text"
        placeholder={props.placeholder}
        className={classes.input}
        onChange={props.onChange}
        value={props.value}
        autoFocus
      />
    </div>
  );
};
