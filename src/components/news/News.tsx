import classes from "./News.module.scss";
//types
import { NewsTypes } from "../../types/types";
import Link from "next/link";
import { NewsContent } from "./NewsContent";

export const News = ({ items }: NewsTypes) => {
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
        <Link href={"https://messari.io/api/docs#tag/News"}> Messari.io</Link>
      </h2>
      <div className={classes.container}>
        <NewsContent items={items} />
      </div>
    </>
  );
};
