import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import classes from "./Exchanges.module.scss";
import style from "../ContainerStyles.module.scss";
import { useState } from "react";
import { ExchangeType } from "../../../types/types";
import { Modal } from "../../ui/modals/Modal";
import { Exchange } from "./Exchange";
import { LoadingSpinner } from "../../ui/LoadingSpinner";
import { ExchangesList } from "./ExchangesList";

let exchangeModal: any;
if (process.browser) {
  exchangeModal = document.getElementById("exchange-modal");
}

export const Exchanges = () => {
  const [exchange, setExchange] = useState({ item: {}, modalOpen: false });
  const { items, errorMessage } = useSelector(
    (state: RootState) => state.statistic.exchanges
  );
  const isLoading = useSelector(
    (state: RootState) => state.statistic.isLoading.exchanges
  );
  const onOpenModal = (item: ExchangeType) => {
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
  return (
    <div className={style.container}>
      <p className={style.title}>Exchanges</p>
      {isLoading && <LoadingSpinner />}
      {itemsExist && !isLoading && (
        <>
          <div className={classes["list-description"]}>
            <p>Name</p>
            <p>Trade volume 24h</p>
          </div>
          <ul className={classes.list}>
            {itemsExist && (
              <ExchangesList items={items} modalAction={onOpenModal} />
            )}
          </ul>
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
