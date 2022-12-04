import classes from "./InputSearch.module.scss";
import { BiSearch } from "react-icons/bi";

interface IProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const InputSearch = ({ placeholder, onChange, value }: IProps) => {
  return (
    <div className={classes["input-box"]}>
      <BiSearch className={classes.search} fontSize={"1.2rem"} color={"#aaa"} />
      <input
        type="text"
        placeholder={placeholder}
        className={classes.input}
        onChange={onChange}
        value={value}
        autoFocus
        aria-label="Search input"
      />
    </div>
  );
};
