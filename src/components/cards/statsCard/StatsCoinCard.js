import classes from "./StatsCoinCard.module.scss";

export const StatsCoinCard = (props) => {
  const valueStyle =
    props.percentage <= 0
      ? `${classes.percentage} ${classes.decr}`
      : `${classes.percentage} ${classes.incr}`;
  return (
    <div className={classes["curr-box"]}>
      <div className={classes["curr-list"]}>
        <span className={classes.rank}>{props.number}</span>
        <div className={classes["coin-wrapper"]}>
          <img src={props.image} />
          <p className={classes.name}>{props.name}</p>
        </div>
        <span className={classes.alias}>{props.alias.toUpperCase()}</span>
      </div>
      <div className={valueStyle}>
        <p>{props.percentage.toFixed(2)}%</p>
      </div>
    </div>
  );
};
