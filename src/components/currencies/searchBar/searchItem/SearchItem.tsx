import Link from "next/link";
import classes from "./SearchItem.module.scss";
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
  const mcr = item.market_cap_rank;
  const isMcr = mcr ? "#" + mcr : "?";
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
          <span>{isMcr}</span>
        </a>
      </Link>
    </li>
  );
};
