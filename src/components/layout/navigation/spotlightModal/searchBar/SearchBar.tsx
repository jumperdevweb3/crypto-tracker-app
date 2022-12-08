import classes from "./SearchBar.module.scss";
import { InputSearch } from "./searchInput/InputSearch";
import React, { useState } from "react";
import { SearchItem } from "./searchItem/SearchItem";
import { useDebounce } from "../../../../../hooks/use-debounce";
import { fetchCoinByQuery } from "./helpers/fetchCoinByQuery";
import { useQuery } from "react-query";
import { ITrendingCoin } from "./types";
import { TrendingSearch } from "./trendingSearch/TrendingSearch";

interface Item {
  id: string;
  name: string;
  thumb: string;
  symbol: string;
  market_cap_rank: number;
}
interface IProps {
  trendingSearch: ITrendingCoin[];
}

export const SearchBar = ({ trendingSearch: items }: IProps) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedSearch = useDebounce(inputValue, 400);

  const { data, status, isError, isLoading } = useQuery<Item[]>(
    ["searchItems", debouncedSearch],
    () => fetchCoinByQuery(debouncedSearch),
    {
      enabled: debouncedSearch.trim().length > 0,
    }
  );

  const SearchItems =
    status === "success" && !!inputValue
      ? data.map((item) => <SearchItem item={item} key={item.id} />)
      : [];

  const inputValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue.toLowerCase());
  };

  const loadingContent = isLoading && (
    <li className={classes["result-info"]}>Loading ...</li>
  );
  const notFoundContent = status === "success" && !data.length && (
    <li className={classes["result-info"]}>Not found items.</li>
  );
  const errorContent = isError && (
    <li className={classes["result-info"]}>Problem with CoinGeco API.</li>
  );
  const trendingSearchContent = !inputValue && (
    <li className={classes["result-info"]}>Trending search 🔥</li>
  );

  const ShowInitialItems = !inputValue && (
    <TrendingSearch trendingSearch={items} />
  );

  const ListContent = (
    <div className={classes["result-box"]}>
      <ul className={classes.list}>
        {SearchItems}
        {trendingSearchContent}
        {ShowInitialItems}
        {loadingContent}
        {notFoundContent}
        {errorContent}
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
        />
        {ListContent}
      </div>
    </div>
  );
};
