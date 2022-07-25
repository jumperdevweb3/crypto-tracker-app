import { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CurrChart } from "../../Currencies/CurrChart";
import classes from "./CoinModal.module.scss";
import { fetchChartData } from "../../../Store/currencies-actions";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../Notification";
import { LoadingSpinner } from "../LoadingSpinner";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("currency-detail");

export const CoinModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  console.log("modal");
  const timeStyle =
    props.change24h <= 0
      ? `${classes.time} ${classes.decr}`
      : `${classes.time} ${classes.incr}`;
  const timeStyleAth =
    props.athChange <= 0
      ? `${classes.time} ${classes.decr}`
      : `${classes.time} ${classes.incr}`;

  useEffect(() => {
    setIsLoading(true);
    const time = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => {
      clearTimeout(time);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchChartData(props.id));
  }, []);

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>
          <div className={classes.box}>
            <div className={classes.data}>
              <img src={props.image} />
              <p>{props.name}</p>
              <p>{props.symbol.toUpperCase()}</p>
            </div>
            <p className={classes.rank}>Rank #{props.rank}</p>
            <div className={classes["second-data"]}>
              <p className={classes.price}>{props.price}$</p>
              <p className={timeStyle}>{props.change24h.toFixed(2)}%</p>
            </div>
          </div>
          <div className={classes["other-box"]}>
            <p>
              Market Cap: <span>${props.marketCap}</span>
            </p>
            <p>
              All Time High: <span>${props.ath}</span>
            </p>
            <p>
              Price change from ATH:
              <span className={timeStyleAth}>{props.athChange} %</span>
            </p>
            <p>
              Last update date:{" "}
              <span className={classes.date}>{props.updated}</span>
            </p>
          </div>
          {isLoading && <LoadingSpinner />}
          <div id="chart">{!isLoading && <CurrChart />}</div>
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};
