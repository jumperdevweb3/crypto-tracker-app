import { FaAngleUp, FaAngleDown } from "react-icons/fa";

export const PriceTimeChange = ({
  time,
  classes,
}: {
  time: any;
  classes: any;
}) => {
  const timeStyle =
    time <= 0
      ? `${classes.time} ${classes.decr}`
      : `${classes.time} ${classes.incr}`;
  const timeIcon = time <= 0 ? <FaAngleDown /> : <FaAngleUp />;
  return (
    <div className={timeStyle}>
      <p>{Math.abs(time.toFixed(2))}%</p>
      {timeIcon}
    </div>
  );
};
