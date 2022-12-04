import Link from "next/link";
import { IExchangesItems } from "../../types";
import classes from "../../CommonBoxStyle.module.scss";
import Image from "next/image";

export const Exchange = ({ item }: { item: IExchangesItems }) => {
  const {
    name,
    year_established,
    country,
    description,
    url,
    image,
    trade_volume_24h_btc_normalized,
    trust_score_rank,
  } = item;

  const descriptionContent = !!description && (
    <p className={classes.description}>{description}</p>
  );
  const countryContent = !!country && (
    <p>
      Country: <span>{country ? country : "No data"}</span>
    </p>
  );
  const yearEstablishedContent = !!year_established && (
    <p>
      Year established:{" "}
      <span>{year_established ? year_established : "No data"}</span>
    </p>
  );
  const tradeVolumeContent = !!trade_volume_24h_btc_normalized && (
    <p className={classes.volume}>
      Trade Volume 24h:{" "}
      <span>{trade_volume_24h_btc_normalized.toFixed(4)} BTC</span>
    </p>
  );
  const trustScoreContent = !!trust_score_rank && (
    <p>
      Trust Score Rank: <span>{trust_score_rank}</span>
    </p>
  );

  const exchangeUrlContent = !!url && (
    <p>
      View Exchange:{" "}
      <Link href={url} passHref>
        <a target="_blank">{name}</a>
      </Link>
    </p>
  );
  return (
    <div className={classes.container}>
      <div className={classes["name-box"]}>
        <Image src={image} alt={name + "logo"} height={"21px"} width={"21px"} />
        <p>{name} </p>
      </div>
      <div className={classes["data-box"]}>
        {countryContent}
        {yearEstablishedContent}
        {tradeVolumeContent}
        {trustScoreContent}
        {exchangeUrlContent}
        {descriptionContent}
      </div>
    </div>
  );
};
