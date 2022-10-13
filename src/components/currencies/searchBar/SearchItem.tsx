import Link from "next/link";
import { CurrencyItem } from "../../../types/types";
import classes from "./SearchBar.module.scss";

export const SearchItem = ({ ...item }: CurrencyItem) => {
  return (
    <li>
      <Link href={`/currency/${item.id}`}>
        <a className={classes["list-item"]}>
          <div className={classes["name-data"]}>
            <img src={item.image} alt={item.name} />
            <p>
              {item.name} <span>{item.symbol.toUpperCase()}</span>
            </p>
          </div>
          <span>#{item.market_cap_rank}</span>
        </a>
      </Link>
    </li>
  );
};
