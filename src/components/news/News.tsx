import classes from "./News.module.scss";
//types
import { NewsTypes } from "../../types/types";
import Link from "next/link";

export const News = ({ items }: NewsTypes) => {
  if (items.length === 0)
    return (
      <h2 className={classes.title}>
        Cannot load news. <span>Try again later.</span>
      </h2>
    );
  const news = items.map((item) => {
    const date = new Date(item.published_at);
    const time = date.toLocaleString();
    const link = `/news/${item.id}`;
    return (
      <div key={item.id} className={classes["news-box"]}>
        <div className={classes.head}>
          <p className={classes.time}>{time}</p>
          <h2 className={classes.title}>{item.title}</h2>
        </div>
        <Link href={item.url} passHref>
          <a target="_blank">Source link</a>
        </Link>
        <div className={classes.footer}>
          <p className={classes.info}>
            Author:
            <span className={classes.author}> {item.author.name}</span>
          </p>
          {item.tags !== "" || item.tags.length !== 0 ? (
            <p className={classes.info}>
              Tags: <span className={classes.keywords}>{item.tags}</span>
            </p>
          ) : null}
        </div>
        <Link href={link}>
          <a className={classes.btn}>Show Article</a>
        </Link>
      </div>
    );
  });
  return (
    <>
      <h2 className={classes.title}>
        <span>BETA </span>Crypto News Fetched from
        <Link href={"https://messari.io/api/docs#tag/News"}> Messari.io</Link>
      </h2>
      <div className={classes.container}>{news}</div>
    </>
  );
};
