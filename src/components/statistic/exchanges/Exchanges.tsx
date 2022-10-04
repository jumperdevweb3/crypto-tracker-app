import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import classes from "./Exchanges.module.scss";
import style from "../ContainerStyles.module.scss";
import { useState } from "react";
import { ExchangeType } from "../../../types/types";
import { Modal } from "../../ui/modals/Modal";
import { Exchange } from "./Exchange";

let exchangeModal: any;
if (process.browser) {
  exchangeModal = document.getElementById("exchange-modal");
}

export const Exchanges = () => {
  const [exchange, setExchange] = useState({ item: {}, modalOpen: false });
  const { items, errorMessage } = useSelector(
    (state: RootState) => state.statistic.exchanges
  );
  const exchangeModalAction = (item: ExchangeType) => {
    setExchange({
      item: item,
      modalOpen: true,
    });

    exchangeModal.classList.add("show");
  };
  const onCloseModal = () => {
    exchangeModal.classList.remove("show");
    setExchange((state) => {
      return {
        item: state.item,
        modalOpen: false,
      };
    });
  };

  const itemsExist = items && items.length !== 0;
  const renderItems =
    itemsExist &&
    items.map((item) => (
      <li
        key={item.id}
        className={classes["list-item"]}
        onClick={() => exchangeModalAction(item)}
      >
        <div className={classes["name-box"]}>
          <img src={item.image} alt={item.name} />
          <p>{item.name}</p>
        </div>
        <span>{item.trust_score_rank}</span>
      </li>
    ));

  return (
    <div className={style.container}>
      <p className={style.title}>Exchanges</p>
      {itemsExist && (
        <>
          <div className={classes["list-description"]}>
            <p>Name</p>
            <p>Trust Rank</p>
          </div>
          <ul className={classes.list}>{renderItems}</ul>
        </>
      )}
      {errorMessage && !itemsExist && <p className="center">{errorMessage}</p>}
      {exchange.modalOpen && (
        <Modal onClose={onCloseModal} id="exchange-modal">
          <Exchange {...exchange} />
        </Modal>
      )}
    </div>
  );
};
