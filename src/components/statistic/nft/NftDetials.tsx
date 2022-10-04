import { NftTypes } from "../../../types/types";
import classes from "./NftDetails.module.scss";

export const NftDetials = ({ ...props }) => {
  const {
    name,
    contract_address,
    asset_platform_id,
    image,
    description,
    native_currency,
    floor_price,
    market_cap,
    volume_24h,
    total_supply,
    floor_price_in_usd_24h_percentage_change,
    number_of_unique_addresses,
    number_of_unique_addresses_24h_percentage_change,
  } = props as NftTypes;
  return (
    <div className={classes.container}>
      <div className={classes["name-box"]}>
        {image.small && <img src={image.small} alt={name + "logo"} />}
        <p>{name}</p>
      </div>
      <div className={classes["content-box"]}>
        <div className={classes["data-box"]}>
          <p>
            Native Currency: <span>{native_currency}</span>
          </p>
          <p>
            Total Supply: <span>{total_supply}</span>
          </p>
          <p className={classes.contract}>
            Contract Address : <span>{contract_address}</span>
          </p>
          <p className={classes.description}>{description}</p>
        </div>
        <div className={classes["stats-box"]}>
          <p>
            Floor Price:{" "}
            <span>
              {floor_price.native_currency} ETH / {floor_price.usd} $
            </span>
          </p>
          <p>
            Market Cap:{" "}
            <span>
              {market_cap.native_currency} ETH / {market_cap.usd} $
            </span>
          </p>
          <p>
            Volume 24h:{" "}
            <span>
              {volume_24h.native_currency} ETH / {volume_24h.usd} $
            </span>
          </p>
          <p>
            Number of unique addresses:{" "}
            <span>{number_of_unique_addresses}</span>
          </p>
          <p>
            Unique addresses 24h change:{" "}
            <span>
              {number_of_unique_addresses_24h_percentage_change.toFixed(3)} %
            </span>
          </p>
          <p>
            Floor Price Change in 24h:{" "}
            <span>{floor_price_in_usd_24h_percentage_change.toFixed(3)} %</span>
          </p>
        </div>
      </div>
    </div>
  );
};
