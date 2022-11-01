import classes from "./SearchBar.module.scss";
import { InputSearch } from "../../ui/inputs/InputSearch";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { RootState } from "../../../store/store";
import { SearchItem } from "./SearchItem";
import { useDebounce } from "./useDebounce";
import { CurrencyItem } from "../../../types/types";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchItems, setSearchItems] = useState<CurrencyItem[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(inputValue, 500);
  const { items } = useSelector((state: RootState) => state.currencies);

  useEffect(() => {
    if (debouncedSearch) {
      const filteredItems = items.filter((coin) => {
        const name = coin.name.toLowerCase();
        return name.includes(inputValue);
      });
      setSearchItems(filteredItems);
    }
    if (!debouncedSearch) setSearchItems([]);
    setLoading(false);
  }, [debouncedSearch]);

  const renderItems = searchItems
    .slice(0, 15)
    .map((item) => <SearchItem {...item} key={item.id} />);

  function inputValueHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setInputValue(newValue.trim().toLowerCase());
    setSearchItems([]);
    setLoading(true);
  }
  function onClickCross() {
    setInputValue("");
  }

  const content = inputValue.length !== 0 && (
    <div className={classes["result-box"]}>
      <ul className={classes.list}>
        {renderItems.length === 0 && !loading ? (
          <li className={classes["result-info"]}>Not found items.</li>
        ) : (
          renderItems
        )}
        {loading && <li className={classes["result-info"]}>Loading ...</li>}
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
