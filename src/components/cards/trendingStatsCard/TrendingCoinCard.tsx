import classes from "./StatsCoinCard.module.scss";
import Link from "next/link";
import { getWordCount } from "../../../helpers/wordCount";

interface Props {
  id: string;
  percentage: any;
  number: number;
  name: string;
  alias: string;
  image: string;
}

export const TrendingCoinCard = (props: Props) => {
  const valueStyle =
    props.percentage <= 0
      ? `${classes.percentage} ${classes.decr}`
      : `${classes.percentage} ${classes.incr}`;
  const breakWordClass =
    getWordCount(props.name) >= 2
      ? `${classes.name} ${classes["word-wrap"]}`
      : `${classes.name} ${classes["word-break"]}`;

  return (
    <div className={classes["curr-box"]}>
      <div className={classes["curr-list"]}>
        <span className={classes.rank}>{props.number}</span>
        <Link href={`/currency/${props.id}`}>
          <div className={classes["coin-wrapper"]}>
            <img src={props.image} />
            <p className={breakWordClass}>
              {props.name}{" "}
              <span className={classes.alias}>
                - {props.alias.toUpperCase()}
              </span>
            </p>{" "}
          </div>
        </Link>
      </div>
      <div className={valueStyle}>
        <p>{props.percentage.toFixed(2)}%</p>
      </div>
    </div>
  );
};
