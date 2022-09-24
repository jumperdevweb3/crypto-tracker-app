import classes from "./StatsCoinCard.module.scss";
import Link from "next/link";

export const StatsCoinCard = (props: {
  id: string;
  percentage: any;
  number: number;
  name: string;
  alias: string;
  image: string;
}) => {
  const valueStyle =
    props.percentage <= 0
      ? `${classes.percentage} ${classes.decr}`
      : `${classes.percentage} ${classes.incr}`;
  const breakWordClass =
    getWordCount(props.name) >= 2
      ? `${classes.name} ${classes["word-wrap"]}`
      : `${classes.name} ${classes["word-break"]}`;

  function getWordCount(str: string) {
    return str.split(" ").filter((n) => n != "").length;
  }
  return (
    <div className={classes["curr-box"]}>
      <div className={classes["curr-list"]}>
        <span className={classes.rank}>{props.number}</span>
        <Link href={`/currency/${props.id}`}>
          <div className={classes["coin-wrapper"]}>
            <img src={props.image} />
            <p className={breakWordClass}>{props.name}</p> -
            <span className={classes.alias}>{props.alias.toUpperCase()}</span>
          </div>
        </Link>
      </div>
      <div className={valueStyle}>
        <p>{props.percentage.toFixed(2)}%</p>
      </div>
    </div>
  );
};
