import { memo } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const PriceTimeChange = ({ time, classes }: { time: number; classes: any }) => {
  const timeStyle =
    time && time <= 0
      ? `${classes.time} decr time-global`
      : `${classes.time} incr time-global`;
  const timeIcon = time <= 0 ? <FaAngleDown /> : <FaAngleUp />;

  const TimeValue = time && (
    <>
      <p>{Math.abs(+time.toFixed(2))}%</p>
      {timeIcon}
    </>
  );
  const TimeContent = time ? TimeValue : <p style={{ color: "#fff" }}>?</p>;
  return <div className={timeStyle}>{TimeContent}</div>;
};
export default memo(PriceTimeChange);
