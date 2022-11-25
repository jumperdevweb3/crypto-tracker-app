import classes from "./News.module.scss";
import { NewsContent } from "./newsContent/NewsContent";
import Link from "next/link";
//types
import { INewsList } from "../../types/types";

export const News = ({ items }: INewsList) => {
  if (items.length === 0)
    return (
      <h2 className={classes.title}>
        Cannot load news. <span>Try again later.</span>
      </h2>
    );
  return (
    <>
      <h2 className={classes.title}>
        <span>BETA </span>Crypto News Fetched from
        <Link href="https://messari.io/api/docs#tag/News" passHref>
          <a target="_blank"> Messari.io</a>
        </Link>
      </h2>
      <div className={classes.container}>
        <NewsContent items={items} />
      </div>
    </>
  );
};
