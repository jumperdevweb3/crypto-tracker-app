import classes from "./SearchBar.module.scss";
import { InputSearch } from "../../ui/inputs/InputSearch";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { RootState } from "../../../store/store";
import { SearchItem } from "./SearchItem";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  const { items } = useSelector((state: RootState) => state.currencies);

  const searchItems = inputValue
    ? items.filter((coin) => {
        const name = coin.name.toLowerCase();
        return name.includes(inputValue);
      })
    : [];

  const renderItems = searchItems
    .slice(0, 15)
    .map((item) => <SearchItem {...item} key={item.id} />);

  function inputValueHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setInputValue(newValue.trim().toLowerCase());
  }
  function onClickCross() {
    setInputValue("");
  }

  const content = inputValue.length !== 0 && (
    <div className={classes["result-box"]}>
      <ul className={classes.list}>
        {renderItems.length === 0 ? (
          <li className={classes["not-found"]}>Not found items.</li>
        ) : (
          renderItems
        )}
      </ul>
    </div>
  );
  return (
    <div className={classes["search-bar"]}>
      <div className={classes["input-container"]}>
        <InputSearch
          placeholder="Search currency"
          onChange={inputValueHandler}
          value={inputValue}
          onClickCross={onClickCross}
        />
        {content}
      </div>
    </div>
  );
};
