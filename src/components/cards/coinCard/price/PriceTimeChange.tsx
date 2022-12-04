import { memo } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const PriceTimeChange = ({
  time,
  classes,
}: {
  time: number;
  classes?: any;
}) => {
  const isPropsClasses = !!classes ? classes.time : "";
  const timeStyle =
    time && time <= 0
      ? `${isPropsClasses} decr time-global`
      : `${isPropsClasses} incr time-global`;
  const timeIcon = time <= 0 ? <FaAngleDown /> : <FaAngleUp />;

  const TimeValue = time && (
    <>
      <p>{Math.abs(+time.toFixed(2))}%</p>
      {timeIcon}
    </>
  );
  const timeContent = time ? TimeValue : <p style={{ color: "#fff" }}>?</p>;
  return <div className={timeStyle}>{timeContent}</div>;
};
export default memo(PriceTimeChange);
