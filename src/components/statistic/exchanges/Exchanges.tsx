import classes from "./Exchanges.module.scss";
import style from "../ContainerStyles.module.scss";
import { useState } from "react";
import { ExchangeType } from "../../../types/types";
import { Modal } from "../../ui/modals/Modal";
import { Exchange } from "./Exchange";
import { LoadingSpinner } from "../../ui/loadingSpinner/LoadingSpinner";
import { ExchangesList } from "./ExchangesList";
import { useQuery } from "react-query";
import { getExchanges } from "../fetchStatistic";

export const Exchanges = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState<ExchangeType>();

  const {
    data: items,
    isError,
    isLoading,
    status,
  } = useQuery<ExchangeType[]>("exchanges", getExchanges, {
    refetchOnWindowFocus: false,
  });

  const onModalActive = (item?: ExchangeType) => {
    setModalOpen((state) => !state);
    if (item) {
      setItem(item);
    }
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={style.container}>
      <p className={style.title}>Exchanges</p>
      {isLoading && <LoadingSpinner />}
      {status === "success" && (
        <>
          <div className={classes["list-description"]}>
            <p>Name</p>
            <p>Trade volume 24h</p>
          </div>
          <ul className={classes.list}>
            <ExchangesList items={items} modalAction={onModalActive} />
          </ul>
        </>
      )}
      {isError && <p className="center">Problem with CoinGeco response.</p>}

      {modalOpen && item && (
        <Modal onClose={onCloseModal}>
          <Exchange item={item} />
        </Modal>
      )}
    </div>
  );
};
