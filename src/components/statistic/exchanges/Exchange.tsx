import Link from "next/link";
import { ExchangeType } from "../../../types/types";
import classes from "./Exchange.module.scss";
import Image from "next/image";

export const Exchange = ({ ...props }) => {
  const {
    name,
    year_established,
    country,
    description,
    url,
    image,
    trade_volume_24h_btc_normalized,
    trust_score_rank,
  } = props.item as ExchangeType;

  const DescriptionContent = !!description && (
    <p className={classes.description}>{description}</p>
  );
  return (
    <div className={classes.container}>
      <div className={classes["name-box"]}>
        <Image
          src={image}
          alt={name + "logo"}
          height={"21px"}
          width={"21px"}
          unoptimized
        />
        <p>{name} </p>
      </div>
      <div className={classes["data-box"]}>
        <p>
          Country: <span>{country ? country : "No data"}</span>
        </p>
        <p>
          Year established:{" "}
          <span>{year_established ? year_established : "No data"}</span>
        </p>
        <p className={classes.volume}>
          Trade Volume 24h:{" "}
          <span>{trade_volume_24h_btc_normalized.toFixed(4)} BTC</span>
        </p>
        <p>
          Trust Score Rank: <span>{trust_score_rank}</span>
        </p>
        <p>
          View Exchange:{" "}
          <Link href={url} passHref>
            <a target="_blank">{name}</a>
          </Link>
        </p>
        {DescriptionContent}
      </div>
    </div>
  );
};
