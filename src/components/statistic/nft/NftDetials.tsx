import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { NftTypes } from "../../../types/types";
import classes from "./NftDetails.module.scss";
import { fetchNftDetial } from "../../../store/statistic-actions";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { currencyValueFormat } from "../../../helpers/numberFromat";
import { LoadingSpinner } from "../../ui/LoadingSpinner";

export const NftDetials = ({ ...props }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingDetial = useSelector(
    (state: RootState) => state.statistic.isLoading.nftDetial
  );
  const [item, setItem] = useState<null | NftTypes>(null);

  useEffect(() => {
    fetchItem(props.id);
  }, []);

  const fetchItem = async (id: string) => {
    const item = await dispatch(fetchNftDetial(id));
    if (item && item !== undefined) {
      setItem(item);
    }
    if (!item || item === undefined) {
      setItem(null);
    }
  };
  return (
    <>
      {isLoadingDetial && <LoadingSpinner />}
      {item && (
        <div className={classes.container}>
          <div className={classes["name-box"]}>
            {item.image.small && (
              <img src={item.image.small} alt={item.name + "logo"} />
            )}
            <p>{item.name}</p>
          </div>
          <div className={classes["content-box"]}>
            <div className={classes["data-box"]}>
              <p>
                Native Currency: <span>{item.native_currency}</span>
              </p>
              <p>
                Total Supply: <span>{item.total_supply}</span>
              </p>
              <p className={classes.contract}>
                Contract Address : <span>{item.contract_address}</span>
              </p>
              <div className={classes.description}>
                <ReactMarkdown>{item.description}</ReactMarkdown>
              </div>
            </div>
            <div className={classes["stats-box"]}>
              <p>
                Floor Price:{" "}
                <span>
                  {item.floor_price.native_currency} ETH /{" "}
                  {currencyValueFormat.format(item.floor_price.usd)}
                </span>
              </p>
              <p>
                Market Cap:{" "}
                <span>
                  {item.market_cap.native_currency} ETH /{" "}
                  {currencyValueFormat.format(item.market_cap.usd)}{" "}
                </span>
              </p>
              <p>
                Volume 24h:{" "}
                <span>
                  {item.volume_24h.native_currency} ETH /{" "}
                  {currencyValueFormat.format(item.volume_24h.usd)}{" "}
                </span>
              </p>
              <p>
                Number of unique addresses:{" "}
                <span>{item.number_of_unique_addresses}</span>
              </p>
              <p>
                Unique addresses 24h change:{" "}
                <span>
                  {item.number_of_unique_addresses_24h_percentage_change.toFixed(
                    2
                  )}{" "}
                  %
                </span>
              </p>
              <p>
                Floor Price Change in 24h:{" "}
                <span>
                  {item.floor_price_in_usd_24h_percentage_change.toFixed(2)} %
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      {!item && !isLoadingDetial && (
        <p className="center">Problem with fetch data.</p>
      )}
    </>
  );
};
