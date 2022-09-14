import classes from "./News.module.scss";
//types
import { NewsTypes } from "../types/types";
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
        <a href={item.url}>Source link</a>
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
          <button className={classes.btn}>Show Article</button>
        </Link>
      </div>
    );
  });
  return (
    <>
      <h2 className={classes.title}>
        The Crypto News Fetched from <span>Messari.io</span>
      </h2>
      <div className={classes.container}>{news}</div>
    </>
  );
};
