import classes from "./NftDetails.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { currencyValueFormat } from "@/helpers/numberFromat";
import { LoadingSpinner } from "../../../ui/loadingSpinner/LoadingSpinner";
import Image from "next/image";
import { INft } from "@/types/types";
import { useQuery } from "react-query";
import { getSingleNft } from "../../fetchStatistic";

export const NftDetials = ({ id }: { id: string }) => {
  const {
    data: item,
    isLoading,
    isError,
    status,
  } = useQuery<INft>([`nft`, id], () => getSingleNft(id));

  const ErrorContent = isError && (
    <p className="center">Problem with CoinGeco response.</p>
  );
  const LoadingContent = isLoading && <LoadingSpinner />;

  const ItemContent = status === "success" && (
    <div className={classes.container}>
      <div className={classes["name-box"]}>
        {item.image.small && (
          <Image
            src={item.image.small}
            alt={item.name + "logo"}
            width={"21px"}
            height={"21px"}
          />
        )}
        <p>{item.name}</p>
      </div>
      <div className={classes["content-box"]}>
        <div className={classes["data-box"]}>
          {!!item.native_currency && (
            <p>
              Native Currency: <span>{item.native_currency}</span>
            </p>
          )}
          {!!item.total_supply && (
            <p>
              Total Supply: <span>{item.total_supply}</span>
            </p>
          )}
          {item.contract_address && (
            <p className={classes.contract}>
              Contract Address : <span>{item.contract_address}</span>
            </p>
          )}
          {!!item.description && (
            <div className={classes.description}>
              <ReactMarkdown>{item.description}</ReactMarkdown>
            </div>
          )}
        </div>
        <div className={classes["stats-box"]}>
          <p>
            Floor Price:{" "}
            <span>
              {item.floor_price.native_currency} ETH /{" "}
              {currencyValueFormat.format(item.floor_price.usd)}
            </span>
          </p>
          {!!item.market_cap.native_currency && !!item.market_cap.usd && (
            <p>
              Market Cap:{" "}
              <span>
                {item.market_cap.native_currency} ETH /{" "}
                {currencyValueFormat.format(item.market_cap.usd)}{" "}
              </span>
            </p>
          )}
          <p>
            Volume 24h:{" "}
            <span>
              {item.volume_24h.native_currency} ETH /{" "}
              {currencyValueFormat.format(item.volume_24h.usd)}{" "}
            </span>
          </p>
          {!!item.number_of_unique_addresses && (
            <p>
              Number of unique addresses:{" "}
              <span>{item.number_of_unique_addresses}</span>
            </p>
          )}
          {!!item.number_of_unique_addresses_24h_percentage_change && (
            <p>
              Unique addresses 24h change:{" "}
              <span>
                {item.number_of_unique_addresses_24h_percentage_change.toFixed(
                  2
                )}{" "}
                %
              </span>
            </p>
          )}
          {!!item.floor_price_in_usd_24h_percentage_change && (
            <p>
              Floor Price Change in 24h:{" "}
              <span>
                {item.floor_price_in_usd_24h_percentage_change.toFixed(2)} %
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <>
      {LoadingContent}
      {ItemContent}
      {ErrorContent}
    </>
  );
};
