import classes from "./SearchBar.module.scss";
import { InputSearch } from "../../ui/inputs/InputSearch";
import React, { useEffect, useState } from "react";
import { SearchItem } from "./SearchItem";
import { useDebounce } from "./useDebounce";
import { fetchCoinByQuery } from "./fetchCoinByQuery";

interface Item {
  id: string;
  name: string;
  thumb: string;
  symbol: string;
  market_cap_rank: number;
}
export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchItems, setSearchItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(inputValue, 500);

  const fetchCoin = async () => {
    const fetchedItems = await fetchCoinByQuery(inputValue);
    if (typeof fetchedItems !== "object") {
      setSearchItems([]);
      return;
    }
    setSearchItems(fetchedItems);
    setLoading(false);
  };
  useEffect(() => {
    if (debouncedSearch) {
      fetchCoin();
    }
    if (!debouncedSearch) setSearchItems([]);
  }, [debouncedSearch]);

  const renderItems = searchItems.map((item) => (
    <SearchItem item={item} key={item.id} />
  ));

  function inputValueHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setInputValue(newValue.toLowerCase());
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
