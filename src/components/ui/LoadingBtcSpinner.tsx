import classes from "./LoadingSpinner.module.scss";
import Image from "next/image";
import gifBitcoin from "../../assets/bitcoin-spinner.gif";

export const LoadingBtcSpinner = () => {
  return (
    <div className={classes.spinnerbox}>
      <Image src={gifBitcoin} alt="my gif" height={50} width={50} />
    </div>
  );
};
