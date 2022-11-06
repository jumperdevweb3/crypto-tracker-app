import { memo } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const PriceTimeChange = ({ time, classes }: { time: number; classes: any }) => {
  const timeStyle =
    time && time <= 0
      ? `${classes.time} decr time-global`
      : `${classes.time} incr time-global`;
  const timeIcon = time <= 0 ? <FaAngleDown /> : <FaAngleUp />;

  const TimeContent = time && (
    <>
      <p>{Math.abs(+time.toFixed(2))}%</p>
      {timeIcon}
    </>
  );
  return <div className={timeStyle}>{TimeContent}</div>;
};
export default memo(PriceTimeChange);
