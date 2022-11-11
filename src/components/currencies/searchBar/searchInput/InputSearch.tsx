import classes from "./InputSearch.module.scss";
import { BiSearch } from "react-icons/bi";
import { ImCross } from "react-icons/im";

export const InputSearch = ({ ...props }) => {
  return (
    <div className={classes["input-box"]}>
      <input
        type="text"
        placeholder={props.placeholder}
        className={classes.input}
        onChange={props.onChange}
        value={props.value}
      />
      <BiSearch className={classes.search} />
      <ImCross
        className={classes.cross}
        fontSize="0.7rem"
        color="#aaa"
        onClick={props.onClickCross}
      />
    </div>
  );
};
