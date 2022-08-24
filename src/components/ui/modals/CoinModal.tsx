import { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./CoinModal.module.scss";
import { fetchChartData } from "../../../store/currencies-actions";
import { useDispatch } from "react-redux";
import { TradingViewChart } from "../../currencies/TradingViewChart";

const Backdrop = (props: any) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props: any) => {
  return (
    <div className={classes.modal}>
      <span className="close-button" onClick={props.onClose}>
        X
      </span>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("currency-detail") as HTMLElement;

export const CoinModal = (props: any) => {
  const {
    id,
    image,
    name,
    symbol,
    current_price,
    market_cap_rank,
    price_change_24h,
    market_cap,
    ath,
    ath_change_percentage,
    last_updated,
  } = props.item;
  const interNumberFormat = new Intl.NumberFormat("en-US");

  const dispatch: any = useDispatch();
  const timeStyle =
    price_change_24h <= 0
      ? `${classes.time} ${classes.decr}`
      : `${classes.time} ${classes.incr}`;
  const timeStyleAth =
    ath_change_percentage <= 0
      ? `${classes.time} ${classes.decr}`
      : `${classes.time} ${classes.incr}`;

  useEffect(() => {
    dispatch(fetchChartData(id));
  }, [dispatch]);

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose}>
          <div className={classes.box}>
            <div className={classes.data}>
              <img src={image} />
              <p>{name}</p>
              <p>{symbol.toUpperCase()}</p>
            </div>

            <p className={classes.rank}>Rank #{market_cap_rank}</p>
            <div className={classes["second-data"]}>
              <p className={classes.price}>
                {interNumberFormat.format(current_price)}$
              </p>
              <p className={timeStyle}>{price_change_24h.toFixed(2)}%</p>
            </div>
          </div>
          <div className={classes["other-box"]}>
            <p>
              Market Cap: <span>${interNumberFormat.format(market_cap)}</span>
            </p>
            <p>
              All Time High: <span>${interNumberFormat.format(ath)}</span>
            </p>
            <p>
              Price change from ATH:
              <span className={timeStyleAth}>
                {interNumberFormat.format(ath_change_percentage)} %
              </span>
            </p>
            <p>
              Last update date:{" "}
              <span className={classes.date}>
                {last_updated.replace(
                  /(\d{4})-(\d{2})-(\d{2})T(.{8}).*/,
                  "$2 $3 $1, $4"
                )}
              </span>
            </p>
          </div>
          <div id="chart">
            <TradingViewChart />
          </div>
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};
