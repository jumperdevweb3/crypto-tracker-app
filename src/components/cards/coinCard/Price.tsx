import { useEffect, useState } from "react";
import useColorChange from "use-color-change";
import { currencyValueFormat } from "../../../helpers/numberFromat";

export const Price = ({ price }: { price: number }) => {
  const [value, setValue] = useState(price);

  const colorStyle = useColorChange(value, {
    higher: "#8dc647",
    lower: "#e15241",
    duration: 2000,
  });
  const coinPrice =
    currencyValueFormat.format(value) === "$0.00"
      ? "$" + value.toFixed(9)
      : currencyValueFormat.format(value);
  useEffect(() => {
    setValue(price);
  }, [price]);
  return <p style={colorStyle}>{coinPrice}</p>;
};
