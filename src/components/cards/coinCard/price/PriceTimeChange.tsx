import { memo } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const PriceTimeChange = ({ time, classes }: { time: number; classes: any }) => {
  const timeStyle =
    time && time <= 0
      ? `${classes.time} decr time-global`
      : `${classes.time} incr time-global`;
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
export default memo(PriceTimeChange);
