import classes from "./SearchBar.module.scss";
import { InputSearch } from "../../ui/InputSearch";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { RootState } from "../../../store/store";
import Link from "next/link";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  const { items } = useSelector((state: RootState) => state.currencies);

  const searchItems = items.filter((coin) => {
    const name = coin.name.toLowerCase();
    return name.includes(inputValue);
  });

  const renderItems = searchItems.slice(0, 15).map((item) => (
    <Link key={item.id} href={`/currency/${item.id}`}>
      <li className={classes["list-item"]}>
        <div className={classes["name-data"]}>
          <img src={item.image} alt={item.name} />
          <p>
            {item.name} <span>{item.symbol.toUpperCase()}</span>
          </p>
        </div>
        <span>#{item.market_cap_rank}</span>
      </li>
    </Link>
  ));

  function inputValueHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setInputValue(newValue.trim().toLowerCase());
  }

  function onClickCross() {
    setInputValue("");
  }

  return (
    <div className={classes["search-bar"]}>
      <div className={classes["input-container"]}>
        <InputSearch
          placeholder="Search currency"
          onChange={inputValueHandler}
          value={inputValue}
          onClickCross={onClickCross}
        />
        {inputValue.length !== 0 && (
          <div className={classes["result-box"]}>
            <ul className={classes.list}>
              {renderItems.length === 0 ? (
                <li className={classes["not-found"]}>Not found items.</li>
              ) : (
                renderItems
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
