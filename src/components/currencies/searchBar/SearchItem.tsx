import Link from "next/link";
import classes from "./SearchBar.module.scss";
import Image from "next/image";

interface Item {
  item: {
    id: string;
    name: string;
    thumb: string;
    symbol: string;
    market_cap_rank: number;
  };
}
export const SearchItem = ({ item }: Item) => {
  return (
    <li>
      <Link href={`/currency/${item.id}`}>
        <a className={classes["list-item"]}>
          <div className={classes["name-data"]}>
            <Image
              src={item.thumb}
              alt={item.name}
              width={"21px"}
              height={"21px"}
              unoptimized
            />
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
