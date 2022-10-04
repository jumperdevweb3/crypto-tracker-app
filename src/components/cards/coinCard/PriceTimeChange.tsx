import { FaAngleUp, FaAngleDown } from "react-icons/fa";

export const PriceTimeChange = ({
  time,
  classes,
}: {
  time: number;
  classes: any;
}) => {
  const timeStyle =
    time && time <= 0
      ? `${classes.time} ${classes.decr}`
      : `${classes.time} ${classes.incr}`;
  const timeIcon = time <= 0 ? <FaAngleDown /> : <FaAngleUp />;
  return (
    <div className={timeStyle}>
      {time && (
        <>
          <p>{Math.abs(+time.toFixed(2))}%</p>
          {timeIcon}
        </>
      )}
    </div>
  );
};
